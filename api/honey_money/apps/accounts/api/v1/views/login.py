from django.contrib.auth import authenticate as django_authenticate
from django.utils.translation import gettext as _

from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response

from rest_framework_jwt.settings import api_settings as rest_framework_jwt_settings

from honey_money.apps.accounts.api.permissions import IsNotAuthenticated
from honey_money.apps.accounts.api.v1.serializers.login import JWTLoginSerializer


class JWTLoginAPIView(GenericAPIView):
    serializer_class = JWTLoginSerializer
    permission_classes = [IsNotAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer_class = self.get_serializer_class()
        serializer = serializer_class(data=request.data)

        if serializer.is_valid():

            email = serializer.validated_data["email"]
            password = serializer.validated_data["password"]
            user = django_authenticate(request, username=email, password=password)

            if user:

                if not user.is_active:
                    raise ValidationError({"detail": _("User account is disabled.")})

                jwt_payload_handler = rest_framework_jwt_settings.JWT_PAYLOAD_HANDLER
                payload = jwt_payload_handler(user)
                jwt_encode_handler = rest_framework_jwt_settings.JWT_ENCODE_HANDLER
                token = jwt_encode_handler(payload)
                jwt_response_payload_handler = rest_framework_jwt_settings.JWT_RESPONSE_PAYLOAD_HANDLER
                response = jwt_response_payload_handler(token, user, request)

                return Response(response, status=status.HTTP_200_OK)

            else:
                raise ValidationError({"detail": _("The email and/or password you specified are not correct.")})

        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
