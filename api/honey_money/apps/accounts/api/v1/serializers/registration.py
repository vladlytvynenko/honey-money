from django.utils.translation import gettext

from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from honey_money.apps.accounts.exceptions import InvalidPasswordError
from honey_money.apps.accounts.models import Family, UserAccount
from honey_money.apps.accounts.services.password import PasswordService
from honey_money.apps.budget.models import Budget


class RegistrationSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(write_only=True, max_length=128)
    password = serializers.CharField(write_only=True, max_length=128)
    first_name = serializers.CharField(required=True, max_length=30)
    last_name = serializers.CharField(required=True, max_length=30)
    family_uuid = serializers.UUIDField(write_only=True, required=True, allow_null=True)
    family_name = serializers.CharField(write_only=True, required=False, allow_null=True)

    class Meta:
        model = UserAccount
        fields = ("email", "first_name", "last_name", "password", "family_uuid", "family_name")

    def __init__(self, *args, **kwargs):
        super(RegistrationSerializer, self).__init__(*args, **kwargs)
        self.password_service = PasswordService()

    def validate_email(self, email):
        if UserAccount.objects.filter(email=email).exists():
            raise ValidationError(gettext("Could not create account with this email."))
        return super().validate(email)

    def validate_family_uuid(self, family_uuid):
        if family_uuid is not None and not Family.objects.filter(uuid=family_uuid).exists():
            raise ValidationError(gettext("Could not find family with that uuid"))
        return family_uuid

    def validate_password(self, new_password):
        try:
            self.password_service.validate_password(new_password)
        except InvalidPasswordError as e:
            raise serializers.ValidationError(e.messages) from e
        return new_password

    def save(self, **kwargs):
        self.instance = UserAccount.objects.create_user(
            self.validated_data.get("email"), self.validated_data.get("password")
        )
        self.instance.first_name = self.validated_data.get("first_name")
        self.instance.last_name = self.validated_data.get("last_name")
        family_uuid = self.validated_data.pop("family_uuid")
        if family_uuid is None:
            family = Family.objects.create(
                name=self.validated_data.get("family_name", f"{self.instance.get_full_name()} Family"),
                creator=self.instance,
            )
            Budget.objects.create(family=family)
            self.instance.family = family
        raw_password = self.validated_data.get("password")
        self.instance.set_password(raw_password)
        self.instance.save()
        return self.instance
