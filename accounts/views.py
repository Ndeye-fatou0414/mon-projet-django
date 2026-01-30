from rest_framework import viewsets, generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import get_user_model
import logging

# ✅ Import pour générer et gérer les jetons JWT
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate
from rest_framework import serializers

from .models import Hotel
from .serializers import HotelSerializer, RegisterSerializer, UserSerializer

# Configuration du logger
logger = logging.getLogger(__name__)

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
# accounts/views.py

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        # On récupère 'email' envoyé par ton React
        email = attrs.get("email")
        password = attrs.get("password")

        if email and password:
            # Django va chercher l'utilisateur avec cet email
            user = authenticate(username=email, password=password)
        else:
            raise serializers.ValidationError("L'email et le mot de passe sont requis.")

        if not user:
            raise serializers.ValidationError("Identifiants incorrects (Email ou Mot de passe).")

        refresh = RefreshToken.for_user(user)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }

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

    def create(self, request, *args, **kwargs):
        """Méthode create avec logs détaillés pour debugging"""
        logger.info("=" * 60)
        logger.info("🏨 CRÉATION D'UN HÔTEL")
        logger.info(f"👤 Utilisateur: {request.user} (ID: {request.user.id})")
        logger.info(f"🔐 Authentifié: {request.user.is_authenticated}")
        logger.info(f"📦 Données reçues: {request.data}")
        logger.info(f"📁 Fichiers reçus: {request.FILES}")
        logger.info("=" * 60)
        
        try:
            # Validation des données
            serializer = self.get_serializer(data=request.data)
            
            if not serializer.is_valid():
                logger.error(f"❌ Erreurs de validation: {serializer.errors}")
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
            # Sauvegarde avec l'utilisateur connecté
            self.perform_create(serializer)
            
            logger.info(f"✅ Hôtel créé avec succès: {serializer.data}")
            
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
            
        except Exception as e:
            logger.error(f"❌ Exception lors de la création: {str(e)}", exc_info=True)
            return Response({
                'error': str(e),
                'type': type(e).__name__,
                'detail': 'Une erreur est survenue lors de la création de l\'hôtel'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def perform_create(self, serializer):
        """Ajoute automatiquement l'utilisateur connecté comme créateur"""
        logger.info(f"💾 Enregistrement de l'hôtel par: {self.request.user}")
        serializer.save(created_by=self.request.user)