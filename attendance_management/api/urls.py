from django.urls import path
from . import views

urlpatterns = [
    path('login', views.Login , name="login"),
    path('signup', views.Signup , name="signup"),
    path('updatepassword', views.UpdatePassword , name="updatepassword"),
    path('addBranch', views.AddBranches , name="branches"),
    path('addSubjects', views.AddSubjects , name="subjects"),
    path('getSubjects', views.GetSubjects , name="getSubjects"),
    path('addProctor', views.AddProctor , name="proctor"),
    path('addStudents', views.AddStudent , name="students"),
    path('addFaculty', views.AddFaculty , name="faculty"),
    path('getFacultyDetails/<uuid:id>', views.GetFaculty , name="faculties"),
]
