from django.urls import path

from honey_money.apps.accounts.api.v1.views.family import FamilyAPIView, FamilyCreateAPIView
from honey_money.apps.accounts.api.v1.views.login import JWTLoginAPIView
from honey_money.apps.accounts.api.v1.views.password import (
    ChangePasswordAPIView,
    ConfirmResetPasswordAPIView,
    ResetPasswordAPIView,
    ResetPasswordDoneViewAPIView,
    ResetPasswordView,
)
from honey_money.apps.accounts.api.v1.views.registration import RegistrationAPIView
from honey_money.apps.accounts.api.v1.views.user_profile import UserProfileAPIView


urlpatterns = [
    path("login/", JWTLoginAPIView.as_view(), name="login"),
    path("me/", UserProfileAPIView.as_view(), name="user-profile"),
    path("password/", ChangePasswordAPIView.as_view(), name="change-password"),
    path("reset-password/confirm/", ConfirmResetPasswordAPIView.as_view(), name="confirm-reset-password"),
    path("password/reset/", ResetPasswordAPIView.as_view(), name="reset-password"),
    path("registration/", RegistrationAPIView.as_view(), name="registration"),
    # custom reset view templates
    path("reset-password/<str:signature>", ResetPasswordView.as_view(), name="reset-password-view"),
    path("password/reset-done/", ResetPasswordDoneViewAPIView.as_view(), name="reset-password-done"),
    # family urls
    path("my-family/", FamilyAPIView.as_view(), name="my-family-api"),
    path("family/create/", FamilyCreateAPIView.as_view(), name="family-create-api"),
]
