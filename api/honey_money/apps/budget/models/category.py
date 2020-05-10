from django.db import models

from honey_money.apps.budget.models.choices import SpendingLimitTypeChoices
from honey_money.apps.budget.utils import get_budget_lines_sum, get_dates_on_spend_limit_type


class Category(models.Model):
    name = models.CharField(max_length=128)
    spending_limit = models.PositiveIntegerField("Spending limit on category", null=True, blank=True)
    spending_limit_type = models.PositiveSmallIntegerField(
        "Spending Limit Type", choices=SpendingLimitTypeChoices.choices, null=True, blank=True
    )
    is_income_category = models.BooleanField()
    budget = models.ForeignKey("budget.Budget", related_name="categories", on_delete=models.CASCADE)

    class Meta:
        unique_together = (("name", "budget"),)
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name.capitalize()

    @property
    def is_expense_category(self):
        return not self.is_income_category

    @property
    def expense_per_day(self):
        return self.get_expense_lines_per_range(*get_dates_on_spend_limit_type(SpendingLimitTypeChoices.DAY))

    @property
    def expense_per_week(self):
        return self.get_expense_lines_per_range(*get_dates_on_spend_limit_type(SpendingLimitTypeChoices.WEEK))

    @property
    def expense_per_month(self):
        return self.get_expense_lines_per_range(*get_dates_on_spend_limit_type(SpendingLimitTypeChoices.MONTH))

    @property
    def expense_per_year(self):
        return self.get_expense_lines_per_range(*get_dates_on_spend_limit_type(SpendingLimitTypeChoices.YEAR))

    def get_expense_lines_per_range(self, start, end):
        return get_budget_lines_sum(self.lines.filter(created__range=(start, end), is_income=False))
