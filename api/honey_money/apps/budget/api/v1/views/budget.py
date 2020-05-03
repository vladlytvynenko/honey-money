from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated

from honey_money.apps.budget.api.v1.serializers.budget import BudgetSerializer


class BudgetAPIView(RetrieveUpdateAPIView):
    serializer_class = BudgetSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = "id"

    def get_object(self):
        return self.request.user.family.budget
