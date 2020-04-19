from django.db import models


class SpendingLimitTypeChoices(models.IntegerChoices):
    DAY = 1, "Day"
    WEEK = 2, "Week"
    MONTH = 3, "Month"
