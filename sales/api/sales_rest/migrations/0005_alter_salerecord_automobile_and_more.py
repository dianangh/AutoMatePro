# Generated by Django 4.0.3 on 2023-03-09 16:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0004_alter_salerecord_price'),
    ]

    operations = [
        migrations.AlterField(
            model_name='salerecord',
            name='automobile',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='automobiles', to='sales_rest.automobilevo'),
        ),
        migrations.AlterField(
            model_name='salerecord',
            name='customer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='customers', to='sales_rest.customer'),
        ),
        migrations.AlterField(
            model_name='salerecord',
            name='sales_person',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sales', to='sales_rest.salesperson'),
        ),
    ]
