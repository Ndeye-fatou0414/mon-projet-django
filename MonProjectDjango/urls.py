from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter

from accounts.views import HotelViewSet

# ==================================================
# ROUTER API
# ==================================================
router = DefaultRouter()
router.register(r"hotels", HotelViewSet, basename="hotel")

# ==================================================
# URLS
# ==================================================
urlpatterns = [
    # Admin
    path("admin/", admin.site.urls),

    # ==================================================
    # AUTHENTIFICATION (DJOSER + JWT)
    # ==================================================
    path("auth/", include("djoser.urls")),        # register, activation, reset
    path("auth/", include("djoser.urls.jwt")),    # login, refresh, verify

    # ==================================================
    # API
    # ==================================================
    path("api/", include(router.urls)),
]

# ==================================================
# MEDIA (DEV)
# ==================================================
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
