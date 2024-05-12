from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializer import UserSerializer , BranchSerializer , SubjectSerializer , ProctorSerializer , StudentSerializer , FacultyTeachingAssignmentSerializer , AttendanceSerializer , StudentSubjectAttendanceSerializer
from .models import Branch , Proctor , Subjects , FacultyTeachingAssignment , Student , StudentSubjectAttendance , Subjects
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
            return Response({"error": "User with the same EID and user_type already exists."}, status=status.HTTP_400_BAD_REQUEST)
    
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
        subjects = Subjects.objects.filter(BranchName = request.data['BranchName'] , year = request.data['year'])
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
        request.data['BranchID'] = branch.BranchID
        serializer = ProctorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data , status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['GET'])
def GetProctor(request, id):
    try:
        proctor = Proctor.objects.filter(id = id)
        serializer = ProctorSerializer(proctor)
        return Response(serializer.data , status=status.HTTP_200_OK)
    except Exception as e:
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
        students = Student.objects.filter(BranchID = BranchID.BranchID , year = year)
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data , status=status.HTTP_200_OK)
    except Exception as e:
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
        serializer = AttendanceSerializer(data=request.data, many=True)
        total_lectures = faculty.total_lectures
        for student_data in request.data:
            student_percentage = Student.objects.get(EnrollmentNumber=student_data['EnrollmentNumber'])
            subject_instance = Subjects.objects.get(SubjectID=student_data['SubjectID'])
            student, created = StudentSubjectAttendance.objects.get_or_create(EnrollmentNumber=student_percentage, SubjectID = subject_instance, defaults={'total_lectures': total_lectures , 'attended_lectures': 0, 'notAttended_lectures': 0 , 'percentage':0.0})
            if student_data['AttendanceStatus'] == 'present':
                student.attended_lectures += 1
                student_percentage.totalAttended += 1
                student_percentage.totalHeld += 1
                student_percentage.totalPercentage = round((student_percentage.totalAttended / student_percentage.totalHeld) * 100,2)

            elif student_data['AttendanceStatus'] == 'absent':
                student.notAttended_lectures += 1
                student_percentage.totalHeld += 1
                student_percentage.totalPercentage = round((student_percentage.totalAttended / student_percentage.totalHeld) * 100,2)
            
            student.percentage = round((student.attended_lectures / total_lectures) * 100, 2)
            student.total_lectures = total_lectures 
            student.save()
            student_percentage.save()
        faculty.total_lectures += 1
        faculty.save()
        if serializer.is_valid():
            serializer.save()
            return Response({"message":"Attendance Marked successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

