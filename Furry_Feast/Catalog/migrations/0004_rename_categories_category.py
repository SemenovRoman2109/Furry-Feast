# Generated by Django 4.1.1 on 2023-06-01 18:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Catalog', '0003_rename_category_categories'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Categories',
            new_name='Category',
        ),
    ]
