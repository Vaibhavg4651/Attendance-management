from rest_framework import serializers
from api.models import Subjects , StudentSubjectAttendance ,Student
from .models import StudentAttendanceDetails as Attendance

class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = ('id', 'SubjectID', 'EnrollmentNumber', 'from_date' , 'to_date' , 'Class', 'year', 'room', 'lessThanPercentage', 'greaterThanPercentage', 'group', 'SubjectType')

class StudentSubjectAttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentSubjectAttendance
        fields = ('total_lectures', 'attended_lectures')

class SubjectSerializer(serializers.ModelSerializer):
    attend = StudentSubjectAttendanceSerializer()

    class Meta:
        model = Subjects
        fields = ('SubjectID', 'Subjectcode', 'SubjectType', 'attend')

class allAttendanceSerializer(serializers.ModelSerializer):
    Subjects = SubjectSerializer(read_only=True , many=True)
    class Meta:
        model = Student
        fields = ( 'ClassSerialNumber','EnrollmentNumber', 'StudentName','Group', 'totalHeld','totalAttended','totalPercentage','Subjects')