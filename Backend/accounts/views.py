from .serializers import (
    BanksSerializer,
    DepositSerializer,
    WithdrawalSerializer,
    TransferSerializer,
)
from .models import Banks, Deposit, Withdrawal, Transfer

from rest_framework.viewsets import ModelViewSet
from django.db.models import Q, Value, F, CharField
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class BanksViewSet(ModelViewSet):
    serializer_class = BanksSerializer

    def get_queryset(self):
        user_id = self.request.query_params.get("user_id")
        filters = Q()
        if user_id:
            filters &= Q(user_id=user_id)
        return Banks.objects.filter(filters)


class DepositViewSet(ModelViewSet):
    queryset = Deposit.objects.all()
    serializer_class = DepositSerializer


class WithdrawalViewSet(ModelViewSet):
    queryset = Withdrawal.objects.all()
    serializer_class = WithdrawalSerializer


class TransferViewSet(ModelViewSet):
    queryset = Transfer.objects.all()
    serializer_class = TransferSerializer


class BankTransactionHistoryView(APIView):

    def get(self, request, bank_id):
        deposits = (
            Deposit.objects.filter(bank_id=bank_id)
            .values("date")
            .annotate(
                number=F("amount"),
                transaction_type=Value("Deposit", output_field=CharField()),
            )
        )

        withdrawals = (
            Withdrawal.objects.filter(bank_id=bank_id)
            .values("date")
            .annotate(
                number=F("amount"),
                transaction_type=Value("Withdrawal", output_field=CharField()),
            )
        )

        tax_deductions = (
            Withdrawal.objects.filter(bank_id=bank_id)
            .values("date")
            .annotate(
                number=F("tax_deduction"),  # Set 'number' to "Tax Deduction"
                transaction_type=Value("Tax Deduction", output_field=CharField()),
            )
        )

        transfers_sent = (
            Transfer.objects.filter(sender_bank_id=bank_id)
            .values("date")
            .annotate(
                number=F("amount"),
                transaction_type=Value("Sent", output_field=CharField()),
            )
        )

        transfers_received = (
            Transfer.objects.filter(receiver_bank_id=bank_id)
            .values("date")
            .annotate(
                number=F("amount"),
                transaction_type=Value("Received", output_field=CharField()),
            )
        )

        # Combine all transactions
        transactions = (
            list(deposits)
            + list(withdrawals)
            + list(tax_deductions)
            + list(transfers_sent)
            + list(transfers_received)
        )

        # Sort transactions by date
        transactions.sort(key=lambda x: x["date"], reverse=True)

        transactions = [
            {
                "number": transaction["number"],
                "date": transaction["date"],
                "transaction_type": transaction["transaction_type"],
            }
            for transaction in transactions
        ]

        return Response(transactions, status=status.HTTP_200_OK)
