from django.contrib import admin
from .models import AutomobileVO, SaleRecord, SalesPerson, Customer


@admin.register(AutomobileVO)
class AutomobileVO(admin.ModelAdmin):
    pass


@admin.register(SaleRecord)
class SaleRecord(admin.ModelAdmin):
    pass


@admin.register(SalesPerson)
class SalesPerson(admin.ModelAdmin):
    pass


@admin.register(Customer)
class Customer(admin.ModelAdmin):
    pass
