from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView

# On importe les vues directement depuis l'application accounts
from accounts.views import (
    RegisterView, 
    HotelViewSet, 
    UpdateProfileView, 
    CustomTokenObtainPairView
)

# 1. Configuration du Router pour les Hôtels
router = DefaultRouter()
router.register(r'hotels', HotelViewSet, basename='hotel')

# 2. Définition des URLS
urlpatterns = [
    # Administration Django
    path('admin/', admin.site.urls),
    
    # Authentification JWT (Connexion par Email)
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # Inscription et Profil
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/user/profile/', UpdateProfileView.as_view(), name='update-profile'),
    
    # Toutes les routes CRUD des hôtels :
    # GET /api/hotels/        -> Liste
    # POST /api/hotels/       -> Ajouter
    # GET /api/hotels/ID/     -> Détail
    # PUT /api/hotels/ID/     -> Modifier
    # DELETE /api/hotels/ID/  -> Supprimer
    path('api/', include(router.urls)),
]

# 3. Gestion des fichiers médias pour le développement local
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)