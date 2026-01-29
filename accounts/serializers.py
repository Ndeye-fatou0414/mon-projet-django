from django.contrib.auth import get_user_model
from rest_framework import serializers
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