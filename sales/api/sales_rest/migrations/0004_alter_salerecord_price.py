# Generated by Django 4.0.3 on 2023-03-07 17:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        (
            "sales_rest",
            "0003_remove_automobilevo_color_remove_automobilevo_year_and_more",
        ),
    ]

    operations = [
        migrations.AlterField(
            model_name="salerecord",
            name="price",
            field=models.PositiveIntegerField(),
        ),
    ]
