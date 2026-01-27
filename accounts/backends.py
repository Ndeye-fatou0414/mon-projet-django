from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model
from django.db.models import Q

User = get_user_model()

class EmailBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        # On tente de récupérer l'utilisateur par email ou par username
        try:
            user = User.objects.get(Q(username=username) | Q(email=username))
        except User.DoesNotExist:
            return None
        except User.MultipleObjectsReturned:
            # Sécurité au cas où deux utilisateurs auraient le même email
            user = User.objects.filter(Q(username=username) | Q(email=username)).first()

        # On vérifie si le mot de passe est correct
        if user and user.check_password(password) and self.user_can_authenticate(user):
            return user
        return None