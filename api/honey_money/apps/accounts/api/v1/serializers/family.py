from rest_framework import serializers

from honey_money.apps.accounts.models import Family, UserAccount


class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ("email", "first_name", "last_name")

    def update(self, instance, validated_data):
        pass

    def create(self, validated_data):
        pass


class FamilySerializer(serializers.ModelSerializer):
    members = MemberSerializer(read_only=True, many=True)
    creator = MemberSerializer(read_only=True)

    class Meta:
        model = Family
        fields = ("uuid", "name", "creator", "created", "members")

    def create(self, validated_data):
        user = self.context["request"].user
        family = Family.create_family(
            name=validated_data.get("name", f"{self.context['request'].user.get_full_name()} Family"), creator=user
        )
        user.family = family
        user.save(update_fields=["family"])
        return family
