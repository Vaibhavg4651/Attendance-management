from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ObjectDoesNotExist
from .serializers import AttendanceSerializer , SubjectSerializer , allAttendanceSerializer
from .models import StudentAttendanceDetails
from api.models import Subjects , FacultyTeachingAssignment , StudentSubjectAttendance , Student
from api.serializer import StudentSubjectAttendanceSerializer , StudentSerializer , FacultyTeachingAssignmentSerializer 

# Create your views here.        

@api_view(['GET'])
def proctor_filter(request):
    if request.method == 'GET':
      try:
        attendanceArray = []
        subjects = []
        subject={}
        facultySubjects = FacultyTeachingAssignment.objects.filter(Class=request.data['Class'], year=request.data['year'])
        for faculty in facultySubjects:
            subjects.append(faculty.SubjectID_id)
        students = Student.objects.filter(BranchID=request.data['BranchID'], year=request.data['year'])
        for student in students:
            attendance = {
            "ClassSerialNumber": student.ClassSerialNumber,
            "EnrollmentNumber": student.EnrollmentNumber,
            "StudentName": student.StudentName,
            "Group": student.Group,
            "totalHeld": student.totalHeld,
            "totalAttended": student.totalAttended,
            "totalPercentage": student.totalPercentage,
            "Subjects": []
                }
            for sub in subjects:
                try:
                    studentdetails = StudentSubjectAttendance.objects.get(EnrollmentNumber=student.EnrollmentNumber , SubjectID=sub)
                    subject = {
                            "SubjectID": sub,
                            "Subjectcode": studentdetails.SubjectID.Subjectcode,
                            "SubjectType": studentdetails.SubjectID.SubjectType,
                            "attend":{"total_lectures": studentdetails.total_lectures,"attended_lectures": studentdetails.attended_lectures
                        }
                        }
                    attendance['Subjects'].append(subject)          
                except StudentSubjectAttendance.DoesNotExist:
                    for faculty in facultySubjects:
                        if faculty.SubjectID_id == sub:
                            subject = {
                                "SubjectID": sub,
                                "Subjectcode": faculty.SubjectID.Subjectcode,
                                "SubjectType": faculty.SubjectID.SubjectType,
                                "attend":{"total_lectures": faculty.total_lectures - 1,
                                "attended_lectures": 0
                            }}
                    attendance['Subjects'].append(subject)

            attendanceArray.append(attendance)

        print(attendanceArray)
        serializer = allAttendanceSerializer(attendanceArray ,many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
      except Exception as e:
          return Response(str(e), status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response("Invalid Request", status=status.HTTP_400_BAD_REQUEST)
    

# @api_view(['POST'])
# def filter(request):

    