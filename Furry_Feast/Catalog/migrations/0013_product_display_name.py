# Generated by Django 4.1.1 on 2023-06-10 17:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Catalog', '0012_product_promotion'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='display_name',
            field=models.CharField(blank=True, max_length=65),
        ),
    ]
