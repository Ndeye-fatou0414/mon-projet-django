from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Hotel

User = get_user_model()

# 1. Gestion des hôtels
class HotelSerializer(serializers.ModelSerializer):
    # ✅ Retourne l'URL complète Cloudinary
    image = serializers.SerializerMethodField()
    
    class Meta:
        model = Hotel
        fields = ['id', 'name', 'address', 'email', 'phone', 'price', 'image', 'created_by', 'created_at', 'updated_at']
        read_only_fields = ['created_by', 'created_at', 'updated_at']
    
    def get_image(self, obj):
        """Retourne l'URL complète Cloudinary ou None"""
        if obj.image:
            # CloudinaryField retourne automatiquement l'URL complète
            return obj.image.url
        return None
    
    def create(self, validated_data):
        """Crée un hôtel avec l'utilisateur connecté"""
        validated_data['created_by'] = self.context['request'].user
        return super().create(validated_data)


# 2. Inscription utilisateur
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ('username', 'email', 'password')

    def validate_email(self, value):
        """Empêcher l'inscription avec un email déjà utilisé"""
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Cet email est déjà utilisé.")
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data.get("username"),
            email=validated_data.get("email"),
            password=validated_data.get("password")
        )
        return user


# 3. Profil utilisateur
class UserSerializer(serializers.ModelSerializer):
    # ✅ Retourne l'URL complète Cloudinary pour l'avatar
    avatar = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'avatar')
    
    def get_avatar(self, obj):
        """Retourne l'URL complète Cloudinary ou None"""
        if obj.avatar:
            return obj.avatar.url
        return None