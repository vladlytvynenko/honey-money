from rest_framework.filters import SearchFilter
from rest_framework.generics import CreateAPIView, DestroyAPIView, ListAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated

from django_filters.rest_framework import DjangoFilterBackend

from honey_money.apps.budget.api.v1.serializers.budget_lines import BudgetLineSerializer


class CreateBudgetLineAPIView(CreateAPIView):
    serializer_class = BudgetLineSerializer
    permission_classes = [IsAuthenticated]


class RetrieveUpdateBudgetLineAPIView(RetrieveUpdateAPIView):
    serializer_class = BudgetLineSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = "id"

    def get_queryset(self):
        return self.request.user.family.budget.lines.all()


class DestroyBudgetLineAPIView(DestroyAPIView):
    serializer_class = BudgetLineSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = "id"

    def get_queryset(self):
        return self.request.user.family.budget.lines.all()


class ListBudgetLineAPIView(ListAPIView):
    serializer_class = BudgetLineSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = (SearchFilter, DjangoFilterBackend)
    search_fields = ["title"]
    filterset_fields = ["category", "value", "title"]

    def get_queryset(self):
        return self.request.user.family.budget.lines.all()
