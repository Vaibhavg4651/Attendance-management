from django.db import models
from api.models import UserAccount, Subjects

# Create your models here.
class StudentAttendanceDetails(models.Model):
    id = models.ForeignKey(UserAccount, on_delete=models.CASCADE , primary_key=True)
    SubjectID = models.ForeignKey(Subjects, on_delete=models.CASCADE)
    EnrollmentNumber = models.CharField(max_length=255)
    from_date = models.DateField(default=0)
    to_date = models.DateField(default=0)
    Class = models.CharField(default=False, max_length=255)
    year = models.IntegerField()
    room = models.CharField(default='', max_length=255)
    lessThanPercentage = models.FloatField(default=0.0)
    greaterThanPercentage = models.FloatField(default=0.0)
    group = models.CharField(max_length=255)
    type_choices = (
        ('lecture','Lecture'),
        ('lab','Lab'),
        ('tutorial','Tutorial'),
    )
    SubjectType = models.IntegerField(choices=type_choices)

    def __str__(self):
        return self
