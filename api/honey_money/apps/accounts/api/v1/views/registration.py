from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response

from rest_framework_jwt.settings import api_settings as rest_framework_jwt_settings

from honey_money.apps.accounts.api.permissions import IsNotAuthenticated
from honey_money.apps.accounts.api.v1.serializers.registration import RegistrationSerializer


class RegistrationAPIView(GenericAPIView):
    serializer_class = RegistrationSerializer
    permission_classes = [IsNotAuthenticated]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        jwt_payload_handler = rest_framework_jwt_settings.JWT_PAYLOAD_HANDLER
        payload = jwt_payload_handler(user)
        jwt_encode_handler = rest_framework_jwt_settings.JWT_ENCODE_HANDLER
        token = jwt_encode_handler(payload)
        jwt_response_payload_handler = rest_framework_jwt_settings.JWT_RESPONSE_PAYLOAD_HANDLER
        response = jwt_response_payload_handler(token, user, request)

        return Response(response, status=status.HTTP_200_OK)
