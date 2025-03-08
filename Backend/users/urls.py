from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UserViewSet,
    FirebaseLoginView,
    FirebaseSignUpView,
)

router = DefaultRouter()
router.register(r"users", UserViewSet, basename="user")
urlpatterns = router.urls


urlpatterns = [
    path("api/", include(router.urls)),
    path("api/signup/", FirebaseSignUpView.as_view(), name="firebase-signup"),
    path("api/login/", FirebaseLoginView.as_view(), name="firebase-login"),
]
