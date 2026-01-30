from rest_framework import viewsets, generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import get_user_model, authenticate
import logging

# ✅ Imports pour JWT
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import (
    HotelSerializer, 
    RegisterSerializer, 
    UserSerializer, 
    CustomTokenObtainPairSerializer # Assure-toi qu'il est bien dans ton serializers.py
)

logger = logging.getLogger(__name__)
User = get_user_model()

# --- LA VUE QUI MANQUE ---
class CustomTokenObtainPairView(TokenObtainPairView):
    """
    Cette vue est celle que ton urls.py essaie d'importer.
    Elle utilise le serializer qui accepte l'email.
    """
    serializer_class = CustomTokenObtainPairSerializer

# --- RESTE DE TES VUES ---
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response({
            "user": serializer.data,
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }, status=status.HTTP_201_CREATED)

class HotelViewSet(viewsets.ModelViewSet):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

# ... Ajoute tes autres vues (Logout, UpdateProfile) ici ...