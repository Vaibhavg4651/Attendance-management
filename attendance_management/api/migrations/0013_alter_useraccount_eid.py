# Generated by Django 4.2.6 on 2024-01-19 09:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_useraccount_is_staff_alter_useraccount_is_superuser'),
    ]

    operations = [
        migrations.AlterField(
            model_name='useraccount',
            name='EID',
            field=models.CharField(max_length=255),
        ),
    ]