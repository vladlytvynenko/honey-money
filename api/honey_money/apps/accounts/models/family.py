from django.db import models

from honey_money.apps.budget.models import Budget
from honey_money.apps.common.models import CoreModel


class Family(CoreModel):
    name = models.CharField(max_length=256)
    creator = models.ForeignKey(
        "accounts.UserAccount", related_name="created_families", null=True, on_delete=models.SET_NULL
    )

    def __str__(self):
        return self.name.capitalize()

    @staticmethod
    def create_family(name, creator):
        family = Family.objects.create(name=name, creator=creator)
        Budget.objects.create(family=family)
        return family

    class Meta:
        verbose_name = "Family"
        verbose_name_plural = "Families"
