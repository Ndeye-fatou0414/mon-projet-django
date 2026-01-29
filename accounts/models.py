from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser
from cloudinary.models import CloudinaryField

# --- Utilisateur custom ---
class User(AbstractUser):
    email = models.EmailField(unique=True)
    # ✅ Utiliser CloudinaryField au lieu de ImageField
    avatar = CloudinaryField('avatar', null=True, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email

# --- Hôtel ---
class Hotel(models.Model):
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    email = models.EmailField(null=True, blank=True)
    phone = models.CharField(max_length=20, null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    # ✅ Utiliser CloudinaryField au lieu de ImageField
    image = CloudinaryField('image', null=True, blank=True)
    # ✅ CORRECTION IMPORTANTE : models.CASCADE au lieu de CASCADE
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.name