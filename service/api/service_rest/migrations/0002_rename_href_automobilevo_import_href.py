# Generated by Django 4.0.3 on 2023-03-06 22:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("service_rest", "0001_initial"),
    ]

    operations = [
        migrations.RenameField(
            model_name="automobilevo",
            old_name="href",
            new_name="import_href",
        ),
    ]
