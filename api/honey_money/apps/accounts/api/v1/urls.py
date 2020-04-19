from django.urls import path

from honey_money.apps.accounts.api.v1.views.login import JWTLoginAPIView
from honey_money.apps.accounts.api.v1.views.password import (
    ChangePasswordAPIView,
    ConfirmResetPasswordAPIView,
    ResetPasswordAPIView,
)
from honey_money.apps.accounts.api.v1.views.registration import RegistrationAPIView
from honey_money.apps.accounts.api.v1.views.user_profile import UserProfileAPIView


urlpatterns = [
    path("login/", JWTLoginAPIView.as_view(), name="login"),
    path("me/", UserProfileAPIView.as_view(), name="user-profile"),
    path("password/", ChangePasswordAPIView.as_view(), name="change-password"),
    path("password/confirm/", ConfirmResetPasswordAPIView.as_view(), name="confirm-reset-password"),
    path("password/reset/", ResetPasswordAPIView.as_view(), name="reset-password"),
    path("registration/", RegistrationAPIView.as_view(), name="registration"),
]
