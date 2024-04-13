from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import AttendanceSerializer , SubjectSerializer , allAttendanceSerializer
from .models import StudentAttendanceDetails
from api.models import Subjects , FacultyTeachingAssignment , StudentSubjectAttendance , Student
from api.serializer import StudentSubjectAttendanceSerializer , StudentSerializer  

# Create your views here.        

@api_view(['GET', 'POST'])
def proctor_filter(request):
    if request.method == 'GET':
      try:
        attendanceArray = []
        attendance = {
            "ClassSerialNumber": 0,
            "EnrollmentNumber": 0,
            "StudentName": "",
            "Group": "",
            "Subjects": [],
            "totalHeld": 0,
            "totalAttended": 0,
            "totalPercentage": 0.0
        }
        subject = {
            "SubjectID": 0,
            "Subjectcode": "",
            "SubjectType": "",
            "total_lectures": 0,
            "total_attended": 0
        }
        subjects = set()
        facultySubjects = FacultyTeachingAssignment.objects.get(Class=request.data['Class'], year=request.data['year'])
        for faculty in facultySubjects:
            subjects.add(faculty.SubjectID_id)
        students = Student.objects.filter(BranchID=request.data['BranchID'], year=request.data['year'])
        for student in students:
            for sub in subjects:
                Subject = Subjects.objects.get(SubjectID=sub)
                studentdetails = StudentSubjectAttendance.objects.get(EnrollmentNumber=student.EnrollmentNumber , SubjectID=sub)
                subject['SubjectID'] = sub
                subject['Subjectcode'] = Subject.Subjectcode
                subject['SubjectType'] = Subject.SubjectType
                if studentdetails.exists():
                    subject['total_lectures'] = studentdetails.total_lectures
                    subject['total_attended'] = studentdetails.attended_lectures
                else:
                    subject['total_lectures'] = FacultyTeachingAssignment.objects.get(SubjectID=sub).total_lectures
                    subject['total_attended'] = 0
                attendance['Subjects'].append(subject.copy())

            attendance['Sr.no'] = student.ClassSerialNumber
            attendance['EnrollmentNumber'] = student.EnrollmentNumber
            attendance['StudentName'] = student.StudentName
            attendance['Group'] = student.Group
            attendance['totalAttended'] = student.totalAttended
            attendance['totalPercentage'] = student.totalPercentage
            attendance['totalHeld'] = student.totalHeld
            attendanceArray.append(attendance.copy())
            serializer = allAttendanceSerializer(attendanceArray , many=True)
        return Response(facultySubjects, status=status.HTTP_200_OK)
      except Exception as e:
          return Response(str(e), status=status.HTTP_400_BAD_REQUEST)
    # elif request.method == 'POST':
    #     serializer = AttendanceSerializer(data=request.data)
    #     if serializer.is_valid():
    #         data = serializer.validated_data
    #         id = data['id']
    #         SubjectID = data['SubjectID']
    #         EnrollmentNumber = data['EnrollmentNumber']
    #         from_date = data['from_date']
    #         to_date = data['to_date']
    #         Class = data['Class']
    #         year = data['year']
    #         room = data['room']
    #         lessThanPercentage = data['lessThanPercentage']
    #         greaterThanPercentage = data['greaterThanPercentage']
    #         group = data['group']
    #         SubjectType = data['SubjectType']
    #         try:
    #             student = UserAccount.objects.get(id=id)
    #             subject = Subjects.objects.get(SubjectID=SubjectID)
    #             studentAttendance = StudentAttendanceDetails(id=student,SubjectID=subject,EnrollmentNumber=EnrollmentNumber,from_date=from_date,to_date=to_date,Class=Class,year=year,room=room,lessThanPercentage=lessThanPercentage,greaterThanPercentage=greaterThanPercentage,group=group,SubjectType=SubjectType)
    #             studentAttendance.save()
    #             return Response("Data saved successfully", status=status.HTTP_201_CREATED)
    #         except:
    #             return Response("Data not saved", status=status.HTTP_400_BAD_REQUEST)
        # else:
        #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    