from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Hotel

User = get_user_model()

# --- SERIALIZER HOTEL ---
class HotelSerializer(serializers.ModelSerializer):
    # ✅ CORRECTION 1 : Mapper price_per_night vers le champ price du modèle
    price_per_night = serializers.DecimalField(
        source='price',
        max_digits=10,
        decimal_places=2
    )
    # ✅ CORRECTION 2 : Champ séparé pour l'URL de l'image (lecture)
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Hotel
        fields = [
            'id', 'name', 'address', 'email', 'phone',
            'price_per_night',   # ✅ Nom exposé dans l'API (écriture)
            'image',             # ✅ Champ pour l'upload (écriture)
            'image_url',         # ✅ Champ pour l'affichage (lecture seule)
            'created_by',
            'created_at', 'updated_at'
        ]
        # ✅ IMPORTANT : Ne PAS mettre 'image' en read_only pour permettre l'upload
        read_only_fields = ['created_by', 'created_at', 'updated_at', 'image_url']

    def get_image_url(self, obj):
        """Retourne l'URL Cloudinary de l'image ou None"""
        if obj.image:
            return obj.image.url
        return None


# --- SERIALIZER INSCRIPTION ---
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


# --- SERIALIZER PROFIL UTILISATEUR ---
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