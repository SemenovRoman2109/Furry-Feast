# Generated by Django 4.1.1 on 2023-06-02 17:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Catalog', '0008_product_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='short_name',
            field=models.CharField(max_length=18, null=True),
        ),
        migrations.AlterField(
            model_name='product',
            name='name',
            field=models.CharField(max_length=255),
        ),
    ]