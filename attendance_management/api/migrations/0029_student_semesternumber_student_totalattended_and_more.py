# Generated by Django 4.2.6 on 2024-03-31 19:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0028_attendance_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='student',
            name='SemesterNumber',
            field=models.IntegerField(default=4),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='student',
            name='totalAttended',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='student',
            name='totalHeld',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='student',
            name='totalPercentage',
            field=models.FloatField(default=0.0),
        ),
        migrations.AddField(
            model_name='studentsubjectattendance',
            name='percentage',
            field=models.FloatField(default=4),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='subjects',
            name='SubjectType',
            field=models.CharField(choices=[('lecture', 'Lecture'), ('lab', 'Lab'), ('tutorial', 'Tutorial')]),
        ),
    ]