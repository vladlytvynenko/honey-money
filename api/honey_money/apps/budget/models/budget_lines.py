from django.db import models


class BudgetLineQueryset(models.QuerySet):
    def incomes(self):
        return self.filter(is_income=True)

    def expenses(self):
        return self.filter(is_income=False)


class BudgetLineManager(models.Manager):
    def get_queryset(self):  # pragma: no cover
        return BudgetLineQueryset(self.model, using=self._db)

    def incomes(self):
        return self.get_queryset().incomes()

    def expenses(self):
        return self.get_queryset().expenses()


class BudgetLine(models.Model):
    budget = models.ForeignKey("budget.Budget", related_name="lines", on_delete=models.CASCADE)
    creator = models.ForeignKey("accounts.UserAccount", related_name="lines", null=True, on_delete=models.SET_NULL)
    category = models.ForeignKey("budget.Category", related_name="lines", null=True, on_delete=models.SET_NULL)
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)
    value = models.PositiveIntegerField()
    title = models.CharField(max_length=24, default="")
    note = models.TextField(null=True, blank=True)
    is_income = models.BooleanField()

    objects = BudgetLineManager()

    def __str__(self):
        return f"{self.title}: {self.value}"

    @property
    def is_expense(self):
        return not self.is_income

    @property
    def name(self):
        return "Income" if self.is_income else "Expense"
