from rest_framework import serializers

from honey_money.apps.budget.models import Budget


class BudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Budget
        fields = ("spending_limit", "spending_limit_type", "full_income", "full_expense", "full_difference")


# TODO implement big logic here
