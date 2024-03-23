from rest_framework import serializers
from .models import UserAccount as user
from .models import Branch , Proctor , Subjects , Student , FacultyTeachingAssignment , Attendance , StudentSubjectAttendance

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = user
        fields = ( 'name' , 'email' , 'user_type' , 'password' , 'EID') #add all the fields of table
        extra_kwargs = {
            'password': {'write_only': True, 'min_length': 8}
        }

class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = ('BranchID', 'BranchName', 'ClassName')

class ProctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proctor
        fields = ('ProctorID', 'id', 'BranchID', 'SemesterNumber')

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subjects
        fields = ('SubjectID','SubjectName' ,'BranchName' ,'SubjectType' , 'year', 'Subjectcode')


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ('EnrollmentNumber', 'BranchID', 'ClassSerialNumber', 'Group', 'StudentName', 'Batch', 'year') 

class StudentSubjectAttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentSubjectAttendance
        fields = ('EnrollmentNumber', 'SubjectID', 'total_lectures', 'attended_lectures')


class FacultyTeachingAssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = FacultyTeachingAssignment
        fields = ('FacultyID', 'id', 'SubjectID', 'SemesterNumber', 'Class', 'year', 'room', 'total_lectures')


class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = ('AttendanceID', 'SubjectID', 'FacultyID', 'EnrollmentNumber' , 'AttendanceStatus' , 'room' )