from django.urls import path
from .views import userView

urlpatterns = [
    path('user', userView.as_view())
]
