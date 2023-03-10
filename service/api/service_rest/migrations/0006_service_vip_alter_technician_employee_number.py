# Generated by Django 4.0.3 on 2023-03-09 18:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0005_rename_completed_service_completed'),
    ]

    operations = [
        migrations.AddField(
            model_name='service',
            name='vip',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='technician',
            name='employee_number',
            field=models.PositiveSmallIntegerField(),
        ),
    ]
