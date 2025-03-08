from django.urls import path, include
from .views import (
    BanksViewSet,
    DepositViewSet,
    WithdrawalViewSet,
    TransferViewSet,
    BankTransactionHistoryView,
)
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r"banks", BanksViewSet, basename="banks")
router.register(r"deposits", DepositViewSet)
router.register(r"withdrawals", WithdrawalViewSet)
router.register(r"transfers", TransferViewSet)

urlpatterns = [
    path("api/", include(router.urls)),
    path("api/bank/<int:bank_id>/transactions-history/", BankTransactionHistoryView.as_view(), name="transactions-history"),

]
