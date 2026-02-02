from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from accounts.views import HotelViewSet # On garde uniquement la vue des Hôtels

# 1. Configuration du Router pour les Hôtels
router = DefaultRouter()
router.register(r'hotels', HotelViewSet, basename='hotel')

# 2. Définition des URLS
urlpatterns = [
    # Administration Django
    path('admin/', admin.site.urls),
    
    # ==========================================================
    # 🔑 AUTHENTIFICATION (DJOSER & JWT) - SEULE SECTION MODIFIÉE
    # ==========================================================
    # Remplace RegisterView, CustomTokenObtainPairView, etc.
    path('auth/', include('djoser.urls')),      # Inscription, Profil, Mot de passe
    path('auth/', include('djoser.urls.jwt')),  # Login, Refresh, Verify
    # ==========================================================

    # Toutes les routes CRUD des hôtels
    path('api/', include(router.urls)),
]

# 3. Gestion des fichiers médias
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)