from rest_framework import viewsets, generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
---

---
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import get_user_model, authenticate
import logging

# ✅ Imports pour JWT
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

# ✅ AJOUTE CES IMPORTS (Crucial pour éviter le NameError)
from .models import Hotel 
from .serializers import (
    HotelSerializer, 
    RegisterSerializer, 
    UserSerializer, 
    CustomTokenObtainPairSerializer
)

logger = logging.getLogger(__name__)
User = get_user_model()

# --- CONNEXION ---
class CustomTokenObtainPairView(TokenObtainPairView):
    """Vue pour la connexion par Email"""
    serializer_class = CustomTokenObtainPairSerializer

# --- INSCRIPTION ---
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

# --- HOTELS (CRUD) ---
class HotelViewSet(viewsets.ModelViewSet):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        """Associe l'hôtel à l'utilisateur qui le crée"""
        serializer.save(created_by=self.request.user)

# --- DECONNEXION ---
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"detail": "Déconnecté."}, status=status.HTTP_205_RESET_CONTENT)
        except Exception:
            return Response(status=status.HTTP_400_BAD_REQUEST)

# --- PROFIL ---
class UpdateProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    def patch(self, request):
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)