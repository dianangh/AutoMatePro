# Generated by Django 4.0.3 on 2023-03-06 23:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0003_rename_tech_name_technician_technician_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='service',
            name='Completed',
            field=models.BooleanField(default=False),
        ),
    ]