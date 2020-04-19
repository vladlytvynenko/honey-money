from django.db import models

from honey_money.apps.common.models import CoreModel


class Family(CoreModel):
    name = models.CharField(max_length=256)
    creator = models.OneToOneField("accounts.UserAccount", related_name="created_family", on_delete=models.PROTECT)

    def __str__(self):
        return self.name.capitalize()

    class Meta:
        verbose_name = "Family"
        verbose_name_plural = "Families"
