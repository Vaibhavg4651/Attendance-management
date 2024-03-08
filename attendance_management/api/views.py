from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializer import UserSerializer , BranchSerializer , SubjectSerializer , ProctorSerializer , StudentSerializer , FacultyTeachingAssignmentSerializer
from .models import Branch , Proctor , Subjects , FacultyTeachingAssignment
from .models import UserAccount as user 

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
# @api_view(['POST'])
# def AddBranches(request):
#     try:
#         serializer = BranchSerializer(data=request.data , many=True)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data , status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#     except Exception as e:
#         return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

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
        subjects = Subjects.objects.all()
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
    

# Faculty api
@api_view(['POST'])
def AddFaculty(request):
    try:
        user_type = user.objects.get(id = request.data['id'])
        if user_type.user_type != 'faculty':
            return Response({"detail": "User is not a faculty"}, status=status.HTTP_400_BAD_REQUEST)
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