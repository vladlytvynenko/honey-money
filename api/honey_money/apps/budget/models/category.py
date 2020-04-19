from django.db import models

from honey_money.apps.budget.models.choices import SpendingLimitTypeChoices


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
