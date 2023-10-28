from django.shortcuts import render
from rest_framework import generics
from .serializer import UserSerializer
from .models import user

# Create your views here.
class userView(generics.CreateAPIView): #listapiview for post request
    queryset = user.objects.all()
    serializer_class = UserSerializer