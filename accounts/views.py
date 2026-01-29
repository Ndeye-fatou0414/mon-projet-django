from rest_framework import viewsets, generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import get_user_model

# ✅ Import pour générer et gérer les jetons JWT
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate
from rest_framework import serializers

from .models import Hotel
from .serializers import HotelSerializer, RegisterSerializer, UserSerializer

# Récupération du modèle User personnalisé
User = get_user_model()

# --- INSCRIPTION ---
class RegisterView(generics.CreateAPIView):
    """Vue pour l'inscription qui connecte l'utilisateur automatiquement"""
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        # ✅ Génération des tokens pour la connexion immédiate
        refresh = RefreshToken.for_user(user)
        
        return Response({
            "user": serializer.data,
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }, status=status.HTTP_201_CREATED)


# --- CONNEXION (email OU username) ---
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'email'
    
    def validate(self, attrs):
        # ✅ Récupérer l'identifiant (peut être email ou username)
        credentials = {
            'username': attrs.get("email"),
            'password': attrs.get("password")
        }
        
        # ✅ Authentifier avec le backend personnalisé
        user = authenticate(**credentials)
        
        if not user:
            raise serializers.ValidationError({
                "non_field_errors": ["Identifiant ou mot de passe incorrect."]
            })
        
        # ✅ Générer les tokens manuellement
        refresh = RefreshToken.for_user(user)
        
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

# --- DECONNEXION ---
class LogoutView(APIView):
    """Vue pour invalider le refresh token lors de la déconnexion"""
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"detail": "Déconnexion réussie."}, status=status.HTTP_205_RESET_CONTENT)
        except Exception:
            return Response({"detail": "Token invalide ou déjà expiré."}, status=status.HTTP_400_BAD_REQUEST)


# --- PROFIL ---
class UpdateProfileView(APIView):
    """Vue pour récupérer ou mettre à jour l'avatar et les infos du profil"""
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


# --- HOTELS ---
class HotelViewSet(viewsets.ModelViewSet):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
