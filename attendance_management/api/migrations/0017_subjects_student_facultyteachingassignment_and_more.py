# Generated by Django 4.2.6 on 2024-01-21 18:00

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0016_rename_classid_proctor_branchid_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Subjects',
            fields=[
                ('SubjectID', models.AutoField(primary_key=True, serialize=False)),
                ('SubjectName', models.CharField(max_length=255)),
                ('SubjectType', models.CharField(max_length=255)),
                ('year', models.IntegerField()),
                ('BranchName', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.branch')),
            ],
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('EnrollmentNumber', models.CharField(max_length=50, primary_key=True, serialize=False, unique=True)),
                ('ClassSerialNumber', models.IntegerField()),
                ('Group', models.CharField(max_length=2)),
                ('StudentName', models.CharField(max_length=255)),
                ('Batch', models.IntegerField()),
                ('year', models.IntegerField()),
                ('BranchID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.branch')),
            ],
        ),
        migrations.CreateModel(
            name='FacultyTeachingAssignment',
            fields=[
                ('FacultyID', models.AutoField(primary_key=True, serialize=False)),
                ('SemesterNumber', models.IntegerField()),
                ('year', models.IntegerField()),
                ('room', models.CharField(max_length=255)),
                ('BranchID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.branch')),
                ('SubjectID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.subjects')),
                ('id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Attendance',
            fields=[
                ('AttendanceID', models.AutoField(primary_key=True, serialize=False)),
                ('Date', models.DateField()),
                ('AttendanceStatus', models.CharField(max_length=255)),
                ('TotalLectures', models.IntegerField()),
                ('LecturesAttended', models.IntegerField()),
                ('EnrollmentNumber', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.student')),
                ('FacultyID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.facultyteachingassignment')),
                ('SubjectID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.subjects')),
            ],
        ),
    ]
