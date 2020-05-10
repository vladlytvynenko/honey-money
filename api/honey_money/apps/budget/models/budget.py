from django.db import models

from honey_money.apps.budget.models.choices import SpendingLimitTypeChoices
from honey_money.apps.budget.utils import get_budget_lines_sum, get_dates_on_spend_limit_type


class Budget(models.Model):
    family = models.OneToOneField("accounts.Family", related_name="budget", on_delete=models.CASCADE)
    spending_limit = models.PositiveIntegerField("Spending limit on budget", null=True, blank=True)
    spending_limit_type = models.PositiveSmallIntegerField(
        "Spending Limit Type", choices=SpendingLimitTypeChoices.choices, null=True, blank=True
    )

    def lines_count(self) -> int:
        return self.lines.count()

    @property
    def income_lines(self):
        return self.lines.incomes()

    @property
    def expense_lines(self):
        return self.lines.expenses()

    @property
    def full_income(self):
        return get_budget_lines_sum(self.income_lines)

    @property
    def full_expense(self):
        return get_budget_lines_sum(self.expense_lines)

    @property
    def full_difference(self):
        return self.full_income - self.full_expense

    @property
    def expense_categories(self):
        return self.categories.filter(is_income_category=False)

    def calculate_lines_for_limit(self):
        start, end = get_dates_on_spend_limit_type(self.spending_limit_type)
        expense = get_budget_lines_sum(self.lines.filter(is_income=False, created__range=(start, end)))
        return self.spending_limit - expense

    @property
    def limit_left(self):
        if self.spending_limit_type is None or self.spending_limit is None:
            return None
        return self.calculate_lines_for_limit()

    def __str__(self):
        return f"Budget {self.family}"
