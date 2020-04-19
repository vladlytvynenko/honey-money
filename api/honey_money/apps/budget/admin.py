from django.contrib import admin

from honey_money.apps.budget.models import Budget, BudgetLine, Category


class BudgetLineInline(admin.TabularInline):
    model = BudgetLine
    fields = ("budget", "creator", "category", "value", "title", "note", "is_income")

    def get_extra(self, request, obj=None, **kwargs):
        return 0


class CategoryInline(admin.TabularInline):
    model = Category
    fields = ("name", "spending_limit", "spending_limit_type", "is_income_category")

    def get_extra(self, request, obj=None, **kwargs):
        return 0


@admin.register(Budget)
class BudgetAdmin(admin.ModelAdmin):
    fieldsets = ((None, {"fields": ("family", "spending_limit", "spending_limit_type")}),)
    inlines = (BudgetLineInline, CategoryInline)
    list_display = ("family", "spending_limit", "spending_limit_type")
    search_fields = ("family__name",)
    readonly_fields = ("family",)


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    fields = ("name", "budget", "spending_limit", "spending_limit_type", "is_income_category")
    list_display = ("name", "budget", "is_income_category")


@admin.register(BudgetLine)
class BudgetLineAdmin(admin.ModelAdmin):
    fields = ("budget", "creator", "category", "value", "title", "note", "is_income")
