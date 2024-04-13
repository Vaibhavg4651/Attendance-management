from django.urls import path
from . import views

urlpatterns = [
    path('proctor', views.proctor_filter , name="proctor_filter"),
]
