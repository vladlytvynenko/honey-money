from rest_framework.filters import SearchFilter
from rest_framework.generics import CreateAPIView, DestroyAPIView, ListAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated

from django_filters.rest_framework import DjangoFilterBackend

from honey_money.apps.budget.api.v1.serializers.category import CategorySerializer


class CreateCategoryAPIView(CreateAPIView):
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]


class RetrieveUpdateCategoryAPIView(RetrieveUpdateAPIView):
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]
    lookup_field = "id"

    def get_queryset(self):
        return self.request.user.family.budget.categories.all()


class DestroyCategoryAPIView(DestroyAPIView):
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]
    lookup_field = "id"

    def get_queryset(self):
        return self.request.user.family.budget.categories.all()


class ListCategoryAPIView(ListAPIView):
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]
    filter_backends = (SearchFilter, DjangoFilterBackend)
    search_fields = ["name", "is_income_category"]
    filterset_fields = ["name", "is_income_category"]
    pagination_class = None

    def get_queryset(self):
        return self.request.user.family.budget.categories.all()
