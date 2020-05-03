from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from honey_money.apps.budget.models import Category


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("id", "name", "spending_limit", "spending_limit_type", "is_income_category")

    def validate_name(self, name):
        budget = self.context["request"].user.family.budget
        qs = budget.categories.filter(name=name)
        if self.instance is not None:
            qs = qs.exclude(id=self.instance.id)
        if qs.exists():
            raise ValidationError("Category with this name already exists")
        return name

    def create(self, validated_data):
        return Category.objects.create(**validated_data, budget=self.context["request"].user.family.budget)
