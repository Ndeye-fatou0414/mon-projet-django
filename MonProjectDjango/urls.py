from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView

# Importation des vues de ton application accounts
try:
    from MonProjectDjango.accounts.views import RegisterView, HotelViewSet, UpdateProfileView, CustomTokenObtainPairView
except ImportError:
    from accounts.views import RegisterView, HotelViewSet, UpdateProfileView, CustomTokenObtainPairView

# 1. Configuration du Router pour les Hôtels (ViewSet)
router = DefaultRouter()
router.register(r'hotels', HotelViewSet, basename='hotel')

# 2. Définition des URLS
urlpatterns = [
    # Administration
    path('admin/', admin.site.urls),
    
    # Authentification (JWT)
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),  # ✅ vue custom
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # Gestion des comptes et Profil
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/user/profile/', UpdateProfileView.as_view(), name='update-profile'),
    
    # CRUD Hôtels (api/hotels/)
    path('api/', include(router.urls)),
]

# 3. Gestion des fichiers médias (Images de profil et d'hôtels)
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
