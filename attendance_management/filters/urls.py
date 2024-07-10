from django.urls import path
from . import views

urlpatterns = [
    path('allfilter', views.all_filter , name="allfilter"),
    path('proctorFilter', views.proctor_filter , name="proctorFilter"),
]
