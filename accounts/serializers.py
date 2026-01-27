from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Hotel

User = get_user_model()

# 1. Gestion des hôtels
class HotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        fields = ['id', 'name', 'address', 'email', 'phone', 'price', 'image', 'created_by']
        read_only_fields = ['created_by']  # ✅ évite l'erreur si non envoyé par le front



# 2. Inscription utilisateur
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)  # ✅ mot de passe minimum 8 caractères

    class Meta:
        model = User
        # On garde username pour compatibilité, mais email est obligatoire
        fields = ('username', 'email', 'password')

    def validate_email(self, value):
        """Empêcher l'inscription avec un email déjà utilisé"""
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Cet email est déjà utilisé.")
        return value

    def create(self, validated_data):
        # ✅ Utilise create_user pour que le mot de passe soit haché
        user = User.objects.create_user(
            username=validated_data.get("username"),
            email=validated_data.get("email"),
            password=validated_data.get("password")
        )
        return user


# 3. Profil utilisateur
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'avatar')
