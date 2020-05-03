from rest_framework import serializers

from honey_money.apps.accounts.api.v1.serializers.family import MemberSerializer
from honey_money.apps.budget.api.v1.serializers.category import CategorySerializer
from honey_money.apps.budget.models import BudgetLine


class BudgetLineSerializer(serializers.ModelSerializer):
    creator = MemberSerializer(read_only=True)
    category_data = CategorySerializer(read_only=True)

    class Meta:
        model = BudgetLine
        fields = (
            "id",
            "creator",
            "category",
            "category_data",
            "created",
            "updated",
            "value",
            "title",
            "note",
            "is_income",
        )

    def create(self, validated_data):
        return BudgetLine.objects.create(
            **validated_data, budget=self.context["request"].user.family.budget, creator=self.context["request"].user
        )
