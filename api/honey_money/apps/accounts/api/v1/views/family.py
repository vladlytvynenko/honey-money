from rest_framework.generics import CreateAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated

from honey_money.apps.accounts.api.v1.serializers.family import FamilySerializer


class FamilyAPIView(RetrieveUpdateAPIView):
    serializer_class = FamilySerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user.family


class FamilyCreateAPIView(CreateAPIView):

    permission_classes = [IsAuthenticated]
    serializer_class = FamilySerializer
