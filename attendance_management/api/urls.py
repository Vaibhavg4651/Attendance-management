from django.urls import path
from .views import userView

urlpatterns = [
    path('', userView.as_view())
]
