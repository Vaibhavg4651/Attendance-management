from django.conf import settings
from rest_framework.authentication import TokenAuthentication
from rest_framework.exceptions import AuthenticationFailed

class CustomTokenAuthentication(TokenAuthentication):
    def authenticate(self, request):
        token = request.COOKIES.get(settings.AUTH_TOKEN_NAME)

        if not token:
            return None
        
        try:
            return super().authenticate_credentials({'key': token})
        except AuthenticationFailed:
            return None

