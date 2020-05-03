from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from honey_money.apps.accounts.api.v1.serializers.family import FamilySerializer
from honey_money.apps.accounts.models import Family, UserAccount


class UserProfileSerializer(serializers.ModelSerializer):
    family = FamilySerializer(read_only=True)
    family_uuid = serializers.UUIDField(write_only=True, allow_null=True)

    class Meta:
        model = UserAccount
        fields = ("email", "first_name", "last_name", "family", "family_uuid")

    def validate_family_uuid(self, family_uuid):
        if family_uuid is not None and not Family.objects.filter(uuid=family_uuid).exists():
            raise ValidationError("Could not find family with that uuid")
        return family_uuid

    def update(self, instance, validated_data):
        family_uuid = validated_data.pop("family_uuid", None)
        if family_uuid is not None:
            instance.family = Family.objects.get(pk=family_uuid)
            instance.save(update_fields=["family"])
        return super().update(instance, validated_data)
