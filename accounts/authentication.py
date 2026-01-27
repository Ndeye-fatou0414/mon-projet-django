# accounts/authentication.py
from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model

class EmailAuthBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        UserModel = get_user_model()
        # On essaie de trouver l'utilisateur via son email
        try:
            user = UserModel.objects.get(email=username)
        except UserModel.DoesNotExist:
            return None
        
        # On vérifie si le mot de passe est correct
        if user.check_password(password):
            return user
        return None