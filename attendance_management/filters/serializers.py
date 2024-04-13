from rest_framework import serializers
from api.models import Subjects , StudentSubjectAttendance ,Student
from .models import StudentAttendanceDetails as Attendance

class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = ('id', 'SubjectID', 'EnrollmentNumber', 'from_date' , 'to_date' , 'Class', 'year', 'room', 'lessThanPercentage', 'greaterThanPercentage', 'group', 'SubjectType')

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subjects , StudentSubjectAttendance
        fields = ('SubjectID', 'Subjectcode', 'SubjectType', 'total_lectures', 'total_attended')

class allAttendanceSerializer(serializers.ModelSerializer):
    Subjects = SubjectSerializer(many=True)
    class Meta:
        model = Student
        fields = ( 'ClassSerialNumber','EnrollmentNumber', 'StudentName','Group', 'Subjects', 'totalHeld','totalAttended','totalPercentage')