# Generated by Django 4.0.3 on 2023-03-07 02:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("sales_rest", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="customer",
            name="phone_number",
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
    ]
