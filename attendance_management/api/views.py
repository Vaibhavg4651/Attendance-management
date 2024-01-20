from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializer import UserSerializer , BranchSerializer
from .models import Branch
from .models import UserAccount as user 

# Create your views here.

# Login API  /user/login

@api_view(['POST'])
def Login(request):
    try:
        userloged = user.objects.get(EID=request.data['EID'] , user_type=request.data['user_type'])
        if request.data["password"] != userloged.password:
            return Response({'message':"Wrong password"}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"id": userloged.id , "email":userloged.email , "user_type": userloged.user_type}, status=status.HTTP_200_OK)
    except user.DoesNotExist:
            return Response({"detail": "User does not exist"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
   

# Register API  /user/signup

@api_view(['POST'])
def Signup(request):
    existing_user = user.objects.filter(EID=request.data['EID'], user_type=request.data['user_type']).first()
    if existing_user:
        return Response({"error": "User with the same EID and user_type already exists."}, status=status.HTTP_400_BAD_REQUEST)

    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data , status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Update Password API  /user/updatepassword

@api_view(['PATCH'])
def UpdatePassword(request):
    try:
        userloged = user.objects.get(EID=request.data['EID'], user_type=request.data['user_type'])
        userloged.password = request.data['newpassword']
        userloged.save()
        return Response({"message": "Password updated"}, status=status.HTTP_200_OK)
    except user.DoesNotExist:
            return Response({"detail": "User does not exist"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    


# Branch api
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
