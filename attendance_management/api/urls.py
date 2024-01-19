from django.urls import path
from . import views

urlpatterns = [
    path('login', views.Login , name="login"),
    path('signup', views.Signup , name="signup"),
    path('updatepassword', views.UpdatePassword , name="updatepassword"),
]
