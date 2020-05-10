from rest_framework import serializers

from honey_money.apps.budget.models import Budget, Category


class ExpenseCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = (
            "id",
            "name",
            "spending_limit",
            "is_income_category",
            "expense_per_day",
            "expense_per_week",
            "expense_per_month",
            "expense_per_year",
        )
        read_only_fields = fields


class BudgetSerializer(serializers.ModelSerializer):
    expense_categories = ExpenseCategorySerializer(many=True, read_only=True)

    class Meta:
        model = Budget
        fields = (
            "spending_limit",
            "spending_limit_type",
            "full_income",
            "full_expense",
            "full_difference",
            "expense_categories",
            "limit_left",
        )
