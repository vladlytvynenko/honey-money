import calendar

from datetime import date, timedelta

from django.db.models import Sum
from django.utils.timezone import now

from honey_money.apps.budget.models.choices import SpendingLimitTypeChoices


def get_dates_on_spend_limit_type(spend_limit_type):
    today = now().date()
    if spend_limit_type == SpendingLimitTypeChoices.DAY:
        start, end = today, today
    elif spend_limit_type == SpendingLimitTypeChoices.WEEK:
        start = today - timedelta(days=today.weekday())
        end = start + timedelta(days=6)
    elif spend_limit_type == SpendingLimitTypeChoices.MONTH:
        _, end_day = calendar.monthrange(today.year, today.month)
        start, end = date(today.year, today.month, 1), date(today.year, today.month, end_day)
    elif spend_limit_type == SpendingLimitTypeChoices.YEAR:
        start, end = date(today.year, 1, 1), date(today.year, 12, 31)
    else:
        assert False, f"Not found spend_limit_type={spend_limit_type}"

    return start, end


def get_budget_lines_sum(qs):
    return qs.aggregate(Sum("value"))["value__sum"] or 0
