from django.db import models
from django.db.models import Sum

from honey_money.apps.budget.models.choices import SpendingLimitTypeChoices


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
        return self._get_lines_sum(self.income_lines)

    @property
    def full_expense(self):
        return self._get_lines_sum(self.expense_lines)

    @property
    def full_difference(self):
        return self.full_income - self.full_expense

    @staticmethod
    def _get_lines_sum(qs):
        return qs.aggregate(Sum("value"))["value__sum"] or 0

    def __str__(self):
        return f"Budget {self.family}"
