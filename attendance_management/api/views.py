from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializer import UserSerializer
from .models import UserAccount as user 

# Create your views here.

# Login API  /user/login

@api_view(['POST'])
def Login(request):
    try:
        userloged = user.objects.get(EID=request.data['EID'])
        if request.data['password'] != userloged.password:
            return Response({'message':"Wrong password"}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"id": userloged.id , "email":userloged.email , "user_type": request.data["user_type"]}, status=status.HTTP_200_OK)
    except user.DoesNotExist:
            return Response({"detail": "User does not exist"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
   

# Register API  /user/signup

@api_view(['POST'])
def Signup(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data , status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Update Password API  /user/updatepassword

@api_view(['PATCH'])
def UpdatePassword(request):
    try:
        userloged = user.objects.get(EID=request.data['EID'])
        userloged.password = request.data['newpassword']
        userloged.save()
        return Response({"id": userloged.id , "email":userloged.email , "user_type": request.data["user_type"]}, status=status.HTTP_200_OK)
    except user.DoesNotExist:
            return Response({"detail": "User does not exist"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
