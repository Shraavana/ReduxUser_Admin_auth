from django.contrib.auth.backends import BaseBackend
from .models import User

class TokenAuthenticationBackend(BaseBackend):
    def authenticate(self, request, token=None):
        
        
        # Check if token is provided
        if not token:
            return None
        
        # Perform authentication based on token
        try:
            user = User.objects.get(token=token)
        except User.DoesNotExist:
            return None
        
        # Optionally, you can perform additional checks here
        
        return user