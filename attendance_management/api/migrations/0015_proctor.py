# Generated by Django 4.2.6 on 2024-01-20 16:08

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0014_branch'),
    ]

    operations = [
        migrations.CreateModel(
            name='Proctor',
            fields=[
                ('ProctorID', models.AutoField(primary_key=True, serialize=False)),
                ('SemesterNumber', models.IntegerField()),
                ('ClassID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.branch')),
                ('UserID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('UserID', 'ClassID')},
            },
        ),
    ]
