# Generated by Django 4.0.3 on 2023-03-09 18:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("service_rest", "0006_service_vip_alter_technician_employee_number"),
    ]

    operations = [
        migrations.CreateModel(
            name="ServiceRecordVO",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("vin", models.CharField(max_length=17)),
            ],
        ),
    ]