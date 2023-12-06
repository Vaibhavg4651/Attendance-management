from django.urls import path
from . import views

urlpatterns = [
    path('user/login', views.Login),
    path('user/signup', views.Signup)
]
