# Generated by Django 4.2.6 on 2024-06-28 16:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('filters', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='studentattendancedetails',
            name='from_date',
            field=models.DateField(default=0),
        ),
        migrations.AlterField(
            model_name='studentattendancedetails',
            name='room',
            field=models.CharField(default=''),
        ),
        migrations.AlterField(
            model_name='studentattendancedetails',
            name='to_date',
            field=models.DateField(default=0),
        ),
    ]
