from django.urls import reverse

from rest_framework import status
from rest_framework.response import Response

import pytest

from honey_money.apps.accounts.models import UserAccount


@pytest.mark.django_db
def test_registration_api_success(unauthorized_api_client, mocker):
    assert UserAccount.objects.count() == 0

    data = {
        "email": "jane@example.com",
        "first_name": "jane",
        "last_name": "doe",
        "password": "super-secret-password",
        "family_uuid": None,
        "family_name": "My Family",
    }  # nosec
    response = unauthorized_api_client.post(reverse("api-v1-accounts:registration"), data)

    assert response.status_code == status.HTTP_200_OK
    assert response.data is not None
    assert "token" in response.data
    assert UserAccount.objects.count() == 1
