

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0031_alter_subjects_subjecttype'),
    ]

    operations = [
        migrations.AlterField(
            model_name='studentsubjectattendance',
            name='SubjectID',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='student_subject_attendance', to='api.subjects'),
        ),
    ]
