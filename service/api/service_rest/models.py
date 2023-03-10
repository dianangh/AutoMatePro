from django.db import models

# Create your models here.


class Technician(models.Model):
    technician_name = models.CharField(max_length=200)
    employee_number = models.PositiveSmallIntegerField()


class Service(models.Model):
    vin = models.CharField(max_length=17)
    name = models.CharField(max_length=200)
    appointment_date = models.DateTimeField(null=True)
    reason = models.CharField(max_length=200)
    completed = models.BooleanField(default=False)
    vip = models.BooleanField(default=False)
    technician = models.ForeignKey(
        Technician, related_name="service", on_delete=models.CASCADE
    )


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    vip = models.BooleanField(default=False)
    import_href = models.CharField(max_length=200)
    model = models.CharField(max_length=200)
    manufacturer = models.CharField(max_length=200)


class ServiceRecordVO(models.Model):
    vin = models.CharField(max_length=17)
