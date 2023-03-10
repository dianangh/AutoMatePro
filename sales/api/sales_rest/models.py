from django.db import models
from django.urls import reverse


class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    vin = models.CharField(max_length=30, unique=True)
    sold = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.id}-{self.import_href}"


class Customer(models.Model):
    name = models.CharField(max_length=20)
    address = models.CharField(max_length=80)
    phone_number = models.CharField(max_length=10, blank=True, null=True)

    def __str__(self):
        return f"{self.name}"


class SalesPerson(models.Model):
    name = models.CharField(max_length=30)
    employee_number = models.CharField(max_length=15, unique=True)

    def __str__(self):
        return f"{self.name}"


class SaleRecord(models.Model):
    sales_person = models.ForeignKey(
        SalesPerson,
        related_name="sales",
        on_delete=models.CASCADE)
    customer = models.ForeignKey(
        Customer,
        related_name="customers",
        on_delete=models.CASCADE)
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="automobiles",
        on_delete=models.CASCADE)
    price = models.PositiveIntegerField(blank=False)
    

    def get_api_url(self):
        return reverse("api_show_sales", kwargs={"pk": self.pk})
