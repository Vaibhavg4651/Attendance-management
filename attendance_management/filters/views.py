from datetime import datetime , timedelta
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
from django.core.exceptions import ObjectDoesNotExist
from .serializers import AttendanceSerializer , SubjectSerializer , allAttendanceSerializer
from .models import StudentAttendanceDetails
from api.models import Subjects , FacultyTeachingAssignment , StudentSubjectAttendance , Student , Attendance
from api.serializer import StudentSubjectAttendanceSerializer , StudentSerializer , FacultyTeachingAssignmentSerializer 

# Create your views here.        

@api_view(['POST'])
def all_filter(request):
    if request.method == 'POST':
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
        serializer = allAttendanceSerializer(attendanceArray ,many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
      except Exception as e:
          return Response(str(e), status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response("Invalid Request", status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['POST'])
def proctor_filter(request):
    try:
        enrollment = request.data.get('filter', {}).get('EnrollmentNumber')
        grp = request.data.get('filter', {}).get('group')
        subjects = request.data.get('filter', {}).get('subjects')

        enrollList = []
        if enrollment and not grp:
            enrollList = Student.objects.filter(EnrollmentNumber__in= enrollment)
        else:
            if grp:
                enrollList = Student.objects.filter(BranchID=request.data['BranchID'], year=request.data['year'], Group= grp)
                if enrollList.count() == 0:
                    return Response("No students found", status=status.HTTP_400_BAD_REQUEST)
            else:
                enrollList = Student.objects.filter(BranchID=request.data['BranchID'], year=request.data['year'])
        subjectList = []
        facultySubjects = FacultyTeachingAssignment.objects.filter(Class=request.data['Class'], year=request.data['year'])
        if subjects:
            subjectList = subjects
        else:
            for faculty in facultySubjects:
                subjectList.append(faculty.SubjectID_id)

        from_date = None
        to_date = None
        to_date_str = request.data.get('filter', {}).get('to_date')
        from_date_str = request.data.get('filter', {}).get('from_date')
        if to_date_str:
            to_date = datetime.strptime(to_date_str, '%Y-%m-%d').date()
        else:
            to_date = timezone.now().date()  # Default to current date if 'to_date' is not provided

        # Check if 'from_date' is provided and set it
        if from_date_str:
            from_date = datetime.strptime(from_date_str, '%Y-%m-%d').date()

        # Handle the case where only 'to_date' is provided
        if to_date and from_date == None:
            filteredAttendance = filterfields(to_date, enrollList, subjectList)
        # Handle the case where both 'from_date' and 'to_date' are provided
        if from_date !=None and to_date!= None:
            if request.data['filter']['from_date'] > request.data['filter']['to_date']:
                return Response("From date cannot be greater", status=status.HTTP_400_BAD_REQUEST)
            if from_date == to_date:
                from_date = from_date - timedelta(days=1)
            filteredAttendance = filterFields(from_date , to_date , enrollList , subjectList)
        
        lessThanPercentage = request.data.get('filter',{}).get('lessThanPercentage')
        greaterThanPercentage = request.data.get('filter',{}).get('greaterThanPercentage')

        if lessThanPercentage and greaterThanPercentage:
            if lessThanPercentage < greaterThanPercentage:
                return Response("percentage range not valid", status=status.HTTP_400_BAD_REQUEST)

        if lessThanPercentage:
            filteredAttendance = [x for x in filteredAttendance if x['totalPercentage'] < lessThanPercentage]
        if greaterThanPercentage:
            filteredAttendance = [x for x in filteredAttendance if x['totalPercentage'] > greaterThanPercentage]
        serializer = allAttendanceSerializer(filteredAttendance , many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        print(str(e))
        return Response(str(e), status=status.HTTP_400_BAD_REQUEST)





def filterfields( to_date, enrollList , subjectList ):
        try:
            print(enrollList)
            attendanceArray = []
            # students = Student.objects.filter(EnrollmentNumber__in=enrollList)
            for student in enrollList:
                attendance = {
                "ClassSerialNumber": student.ClassSerialNumber,
                "EnrollmentNumber": student.EnrollmentNumber,
                "StudentName": student.StudentName,
                "Group": student.Group,
                "totalHeld": 0,
                "totalAttended": 0,
                "totalPercentage": 0.0,
                "Subjects": []
                    }
                totalHeld=0
                totalAttended=0
                for sub in subjectList:
                    try:
                        studentdetails = Attendance.objects.get(EnrollmentNumber= student.EnrollmentNumber , SubjectID=sub, Date = to_date)
                        subject = {
                                "SubjectID": sub,
                                "Subjectcode": studentdetails.SubjectID.Subjectcode,
                                "SubjectType": studentdetails.SubjectID.SubjectType,
                                "attend":{"total_lectures": studentdetails.total_lectures,"attended_lectures": studentdetails.attended_lectures
                            }
                            }
                        totalHeld += studentdetails.total_lectures
                        totalAttended += studentdetails.attended_lectures
                        attendance['Subjects'].append(subject)          
                    except Attendance.DoesNotExist:
                        studentSubject = StudentSubjectAttendance.objects.get(EnrollmentNumber= student.EnrollmentNumber , SubjectID=sub)
                        subject = {
                                    "SubjectID": sub,
                                    "Subjectcode": studentSubject.SubjectID.Subjectcode,
                                    "SubjectType": studentSubject.SubjectID.SubjectType,
                                    "attend":{
                                        "total_lectures": studentSubject.total_lectures,
                                        "attended_lectures": studentSubject.attended_lectures
                                }}
                        totalHeld += studentSubject.total_lectures
                        totalAttended += studentSubject.attended_lectures
                        attendance['Subjects'].append(subject)

                if totalHeld == 0:
                    totalHeld = 1
                attendance['totalHeld'] = totalHeld
                attendance['totalAttended'] = totalAttended
                attendance['totalPercentage'] = round((totalAttended/totalHeld)*100,2)
                attendanceArray.append(attendance)
            print(attendanceArray)
            return attendanceArray
        except Exception as e:
            print(str(e))
            return str(e)
        

def filterFields(from_date , to_date , enrollList , subjectList ):
        try:
            attendanceArray = []
            students = Student.objects.filter(EnrollmentNumber__in=enrollList)
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
                totalHeld=0
                totalAttended=0
                for sub in subjectList:
                    try:
                        studentday1 = Attendance.objects.get(EnrollmentNumber=student.EnrollmentNumber , SubjectID=sub , Date = to_date)
                        studentday2 = Attendance.objects.get(EnrollmentNumber=student.EnrollmentNumber , SubjectID=sub , Date = from_date)
                        total_lectures = studentday1.total_lectures - studentday2.total_lectures
                        attended_lectures = studentday1.attended_lectures - studentday2.attended_lectures
                        subject = {
                                "SubjectID": sub,
                                "Subjectcode": studentday1.SubjectID.Subjectcode,
                                "SubjectType": studentday1.SubjectID.SubjectType,
                                "attend":{"total_lectures": total_lectures,"attended_lectures": attended_lectures}
                            }
                        totalHeld += total_lectures
                        totalAttended += attended_lectures
                        attendance['Subjects'].append(subject)          
                    except Attendance.DoesNotExist:
                                subjectss = Subjects.objects.get(SubjectID=sub)
                                subject = {
                                    "SubjectID": sub,
                                    "Subjectcode": subjectss.Subjectcode,
                                    "SubjectType": subjectss.SubjectType,
                                    "attend":{
                                        "total_lectures": 0,
                                        "attended_lectures": 0
                                }}
                                attendance['Subjects'].append(subject)
                if totalHeld == 0:
                    totalHeld = 1
                attendance['totalHeld'] = totalHeld
                attendance['totalAttended'] = totalAttended
                attendance['totalPercentage'] = round((totalAttended/totalHeld)*100,2)
                attendanceArray.append(attendance)
            return attendanceArray
        except Exception as e:
            print(str(e))
            return str(e)