from django.contrib.auth import get_user_model, authenticate # Ajout authenticate
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken # Ajout RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer # Ajout
from .models import Hotel

User = get_user_model()

# --- SERIALIZER HOTEL ---
class HotelSerializer(serializers.ModelSerializer):
    price_per_night = serializers.DecimalField(
        source='price',
        max_digits=10,
        decimal_places=2
    )
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Hotel
        fields = [
            'id', 'name', 'address', 'email', 'phone',
            'price_per_night', 
            'image', 
            'image_url', 
            'created_by',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['created_by', 'created_at', 'updated_at', 'image_url']

    def get_image_url(self, obj):
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
    avatar_url = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'avatar', 'avatar_url')
        read_only_fields = ['avatar_url']
    
    def get_avatar_url(self, obj):
        if obj.avatar:
            return obj.avatar.url
        return None

# --- SERIALIZER CONNEXION (JWT) ---
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    email = serializers.EmailField(write_only=True)
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        if not email or not password:
            raise serializers.ValidationError("L'email et le mot de passe sont requis.")

        # Authentification par email
        user = authenticate(username=email, password=password)

        if not user:
            raise serializers.ValidationError("Identifiants incorrects (Email ou Mot de passe).")

        refresh = RefreshToken.for_user(user)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }