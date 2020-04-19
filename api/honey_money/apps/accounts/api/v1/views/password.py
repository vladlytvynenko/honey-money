from django.http import HttpResponseRedirect
from django.urls import reverse
from django.views.generic.base import TemplateView

from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.parsers import FormParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

from honey_money.apps.accounts.api.v1.serializers.password import (
    ChangePasswordSerializer,
    ConfirmResetPasswordSerializer,
    ResetPasswordSerializer,
)


class ChangePasswordAPIView(CreateAPIView):
    serializer_class = ChangePasswordSerializer
    permission_classes = (IsAuthenticated,)

    @swagger_auto_schema(responses={status.HTTP_204_NO_CONTENT: openapi.Response("")})
    def post(self, request, *args, **kwargs):  # pragma: no cover
        super(ChangePasswordAPIView, self).post(request, *args, **kwargs)
        return Response(status=status.HTTP_204_NO_CONTENT)


class ResetPasswordAPIView(CreateAPIView):
    serializer_class = ResetPasswordSerializer

    @swagger_auto_schema(responses={status.HTTP_204_NO_CONTENT: openapi.Response("")})
    def post(self, request, *args, **kwargs):  # pragma: no cover
        super(ResetPasswordAPIView, self).post(request, *args, **kwargs)
        return Response(status=status.HTTP_204_NO_CONTENT)


class ResetPasswordView(TemplateView):
    template_name = "reset-password.html"

    def get(self, request, signature):
        context = {"signature": signature}
        return self.render_to_response(context)


class ResetPasswordDoneViewAPIView(TemplateView):
    template_name = "reset-password-done.html"


class ConfirmResetPasswordAPIView(CreateAPIView):
    parser_classes = [FormParser]

    serializer_class = ConfirmResetPasswordSerializer

    @swagger_auto_schema(responses={status.HTTP_204_NO_CONTENT: openapi.Response("")})
    def post(self, request, *args, **kwargs):  # pragma: no cover
        super(ConfirmResetPasswordAPIView, self).post(request, *args, **kwargs)
        return HttpResponseRedirect(reverse("api-v1-accounts:reset-password-done"))
