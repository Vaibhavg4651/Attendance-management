from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0025_alter_student_enrollmentnumber_alter_student_group'),
    ]

    operations = [
        migrations.AddField(
            model_name='attendance',
            name='room',
            field=models.CharField(default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='facultyteachingassignment',
            name='total_lectures',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='studentsubjectattendance',
            name='notAttended_lectures',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='studentsubjectattendance',
            name='attended_lectures',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='studentsubjectattendance',
            name='total_lectures',
            field=models.IntegerField(),
        ),
    ]
