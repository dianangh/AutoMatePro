# Generated by Django 4.0.3 on 2023-03-06 22:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0002_rename_href_automobilevo_import_href'),
    ]

    operations = [
        migrations.RenameField(
            model_name='technician',
            old_name='tech_name',
            new_name='technician_name',
        ),
    ]
