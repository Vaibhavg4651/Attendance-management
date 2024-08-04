from datetime import datetime
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
from .serializer import UserSerializer , BranchSerializer , SubjectSerializer , ProctorSerializer , StudentSerializer , FacultyTeachingAssignmentSerializer , AttendanceSerializer , StudentSubjectAttendanceSerializer
from .models import Branch , Proctor , Subjects , FacultyTeachingAssignment , Student , StudentSubjectAttendance , Subjects, Attendance
from .models import UserAccount as user 
from django.core.exceptions import MultipleObjectsReturned

# Create your views here.

# Login API  /user/login

@api_view(['POST'])
def Login(request):
    try:
        userloged = user.objects.get(EID=request.data['EID'] , user_type=request.data['user_type'])

        if not check_password(request.data['password'], userloged.password):
            return Response({'message':"Wrong password"}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({"id": userloged.id , "email":userloged.email , "user_type": userloged.user_type}, status=status.HTTP_200_OK)
    
    except user.DoesNotExist:
            return Response({"detail": "User does not exist"}, status=status.HTTP_404_NOT_FOUND)
    
    except Exception as e:
        return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
   

# Register API  /user/signup

@api_view(['POST'])
def Signup(request):
    try:
        existing_user = user.objects.filter(EID=request.data['EID'], user_type=request.data['user_type']).first()
        if existing_user:
            return Response({"message": "User with the same EID and user_type already exists."}, status=status.HTTP_400_BAD_REQUEST)
    
        request.data['password'] = make_password(request.data['password'])

        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data , status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    

# Update Password API  /user/updatepassword

@api_view(['PATCH'])
def UpdatePassword(request):
    try:
        userloged = user.objects.get(EID=request.data['EID'], user_type=request.data['user_type'])
        request.data['newpassword'] = make_password(request.data['newpassword'])
        userloged.password = request.data['newpassword']
        userloged.save()
        return Response({"message": "Password updated"}, status=status.HTTP_200_OK)
    except user.DoesNotExist:
            return Response({"detail": "User does not exist"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    


# Branch api /user/addBranch
@api_view(['POST'])
def AddBranches(request):
    try:
        serializer = BranchSerializer(data=request.data , many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data , status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

# Branch api /user/addSubjects
@api_view(['POST'])
def AddSubjects(request):
    try:
        serializer = SubjectSerializer(data=request.data , many=True)
        if serializer.is_valid():
            serializer.save()                                                           
            return Response(serializer.data , status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    
@api_view(['GET'])
def GetSubjects(request):
    try:
        Branch = request.query_params.get('BranchName')
        year = request.query_params.get('year')
        subjects = Subjects.objects.filter(BranchName = Branch , year = year)
        serializer = SubjectSerializer(subjects, many=True)
        return Response(serializer.data , status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Proctor api
@api_view(['POST'])
def AddProctor(request):
    try:
        user_type = user.objects.get(id = request.data['id'])
        if user_type.user_type != 'proctor':
            return Response({"detail": "User is not a proctor"}, status=status.HTTP_400_BAD_REQUEST)
        branch = Branch.objects.get(ClassName=request.data['BranchID'])
        proctor = Proctor.objects.filter(BranchID = branch.BranchID, SemesterNumber = request.data['SemesterNumber'])
        if proctor:
            return Response({"detail": "Proctor for this class already exist"}, status=status.HTTP_400_BAD_REQUEST)
        request.data['BranchID'] = branch.BranchID
        serializer = ProctorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data , status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        print(str(e))
        return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['GET'])
def GetProctor(request, id):
    try:
        proctor = Proctor.objects.get(id=id)
        if not proctor:
            return Response({"detail": "Proctor does not exist"}, status=status.HTTP_404_NOT_FOUND)
        serializer = ProctorSerializer(proctor)
        return Response(serializer.data , status=status.HTTP_200_OK)
    except Exception as e:
        print(str(e))
        return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['PATCH'])
def UpdateProctor(request):
    try:
        proctor = Proctor.objects.get(id = request.data['id'])
        branch = Branch.objects.get(ClassName=request.data['BranchID'])
        proctor.BranchID = branch.BranchID
        proctor.save()
        return Response({"message":"Proctor updated succesfully"} , status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Faculty api
@api_view(['POST'])
def AddFaculty(request):
    try:
            serializer = FacultyTeachingAssignmentSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data , status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

@api_view(['GET'])
def GetFaculty(request, id):
    try:
        faculty = FacultyTeachingAssignment.objects.filter(id = id)
        serializer = FacultyTeachingAssignmentSerializer(faculty, many=True)
        return Response(serializer.data , status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

@api_view(['PATCH'])
def UpdateFaculty(request):
    try:
        faculty = FacultyTeachingAssignment.objects.get(Class = request.data['Class'] , SubjectID = request.data['SubjectID'])
        faculty.room = request.data['room']
        faculty.save()
        return Response({"message":"room updated succesfully"} , status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['DELETE'])
def DeleteFaculty(request):
    try:
        faculty = FacultyTeachingAssignment.objects.get(Class = request.data['Class'], SubjectID = request.data['SubjectID'])
        faculty.delete()
        return Response({"message":"Faculty deleted succesfully"} , status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Student api
@api_view(['POST'])
def AddStudent(request):
    try:
        serializer = StudentSerializer(data=request.data, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data , status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

@api_view(['GET'])
def GetStudentWithClass(request):
    try:
        Class = request.query_params.get('Class')
        year = request.query_params.get('year')
        BranchID = Branch.objects.get(ClassName=Class)
        students = Student.objects.filter(BranchID = BranchID.BranchID , year =year)
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data , status=status.HTTP_200_OK)
    except Exception as e:
        print(str(e))
        return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['PATCH'])
def UpdateStudent(request):
    try:
        serializer = StudentSerializer()
        model_fields = serializer.fields.keys()
        for student_data in request.data:
            student = Student.objects.get(EnrollmentNumber=student_data['EnrollmentNumber'])
            for key in student_data.keys():
                if key == 'EnrollmentNumber':
                    continue
                if key == 'BranchID':  
                    branch_id = student_data[key]
                    branch = Branch.objects.get(pk=branch_id) 
                    setattr(student, 'BranchID', branch)
                    continue
                if key in model_fields:
                    setattr(student, key, student_data[key])
            student.save()
        return Response({"message":"Student data updated succesfully"} , status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['DELETE'])
def DeleteStudent(request):
    try:
        student = Student.objects.filter(EnrollmentNumber = request.data['EnrollmentNumber'])
        student.delete()
        return Response({"message":"Student deleted succesfully"} , status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

@api_view(['POST'])
def MarkAttendance(request , id):
    try:
        faculty = FacultyTeachingAssignment.objects.get(FacultyID = id)
        total_lectures = faculty.total_lectures
        attendance = []
        for student_data in request.data:
            if student_data['AttendanceStatus'] not in ['present', 'absent']:
                return Response({"message":"Mark Attendance Properly"}, status=status.HTTP_400_BAD_REQUEST)
            date = student_data.get('Date', None)
            # Set date to current date if not provided or empty
            if date is None or date == '':
                date = timezone.now().date()
            student = Attendance.objects.filter(EnrollmentNumber=student_data['EnrollmentNumber'], SubjectID=student_data['SubjectID'], Date = date)
            if student:
                return Response({"message":"Attendance already marked"}, status=status.HTTP_200_OK)
            student_percentage = Student.objects.get(EnrollmentNumber=student_data['EnrollmentNumber'])
            print(student_percentage)
            subject_instance = Subjects.objects.get(SubjectID=student_data['SubjectID'])
            Students, created = StudentSubjectAttendance.objects.get_or_create(EnrollmentNumber=student_percentage, SubjectID = subject_instance, defaults={'total_lectures': total_lectures , 'attended_lectures': 0, 'notAttended_lectures': 0 , 'percentage':0.0})
            print(student)
            if student_data['AttendanceStatus'] == 'present':
                Students.attended_lectures += 1
                student_percentage.totalAttended += 1
                student_percentage.totalHeld += 1
                student_percentage.totalPercentage = round((student_percentage.totalAttended / student_percentage.totalHeld) * 100,2)

            elif student_data['AttendanceStatus'] == 'absent':
                Students.notAttended_lectures += 1
                student_percentage.totalHeld += 1
                student_percentage.totalPercentage = round((student_percentage.totalAttended / student_percentage.totalHeld) * 100,2)
            
            Students.percentage = round((Students.attended_lectures / total_lectures) * 100, 2)
            Students.total_lectures = total_lectures 
            date = datetime.strptime(str(date), '%Y-%m-%d').date()
            if isinstance(Students.Date, datetime):
                student_date = Students.Date.date()
            else:
                student_date = Students.Date

            if student_date < date:
                Students.Date = date

            Students.save()
            student_percentage.save()
            

            attendanceObject = {
            "SubjectID" : student_data['SubjectID'],
            "FacultyID" : id,
            "EnrollmentNumber" : student_data['EnrollmentNumber'], 
            "AttendanceStatus" : student_data['AttendanceStatus'],
            "room" : student_data['room'],
            "total_lectures" : total_lectures,
            "attended_lectures" : Students.attended_lectures,
            "Date": date
            }
            attendance.append(attendanceObject)
        faculty.total_lectures += 1
        faculty.save()

        serializer = AttendanceSerializer(data=attendance, many=True)
        if serializer.is_valid():
            serializer.save() 
            return Response({"message":"Attendance Marked successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        print(str(e))
        return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

