# Generated by Django 4.2.6 on 2024-03-26 08:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0026_attendance_room_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='attendance',
            name='Date',
        ),
    ]
