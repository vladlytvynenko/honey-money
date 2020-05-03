from django.urls import path

from honey_money.apps.budget.api.v1.views.budget import BudgetAPIView
from honey_money.apps.budget.api.v1.views.budget_lines import (
    CreateBudgetLineAPIView,
    DestroyBudgetLineAPIView,
    ListBudgetLineAPIView,
    RetrieveUpdateBudgetLineAPIView,
)
from honey_money.apps.budget.api.v1.views.category import (
    CreateCategoryAPIView,
    DestroyCategoryAPIView,
    ListCategoryAPIView,
    RetrieveUpdateCategoryAPIView,
)


urlpatterns = [
    # categories
    path("categories/", ListCategoryAPIView.as_view(), name="category-list"),
    path("category/create/", CreateCategoryAPIView.as_view(), name="category-create"),
    path("category/<int:id>/", RetrieveUpdateCategoryAPIView.as_view(), name="category-read-update"),
    path("category/<int:id>/delete/", DestroyCategoryAPIView.as_view(), name="category-delete"),
    # budget
    path("budget/", BudgetAPIView.as_view(), name="budget"),
    # lines
    path("budget-lines/", ListBudgetLineAPIView.as_view(), name="budget-lines-list"),
    path("budget-line/create/", CreateBudgetLineAPIView.as_view(), name="budget-line-create"),
    path("budget-line/<int:id>/", RetrieveUpdateBudgetLineAPIView.as_view(), name="budget-line-read-update"),
    path("budget-line/<int:id>/delete/", DestroyBudgetLineAPIView.as_view(), name="budget-line-delete"),
]
