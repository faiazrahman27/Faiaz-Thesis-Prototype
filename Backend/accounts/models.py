from django.db import models
from django.contrib.auth.models import User


class Banks(models.Model):
    user = models.OneToOneField(User, on_delete=models.PROTECT, related_name="bank")
    name = models.CharField(max_length=50, default="bank")
    balance = models.FloatField(default=0)

    class Meta:
        db_table = "bank"

    def __str__(self):
        return self.name


class Deposit(models.Model):
    bank = models.ForeignKey(Banks, on_delete=models.PROTECT, related_name="deposits")
    amount = models.FloatField()
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "deposit"


class Withdrawal(models.Model):
    bank = models.ForeignKey(
        Banks, on_delete=models.PROTECT, related_name="withdrawals"
    )
    amount = models.FloatField()
    tax_deduction = models.FloatField()
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "withdrawal"


class Transfer(models.Model):
    sender_bank = models.ForeignKey(
        Banks, on_delete=models.PROTECT, related_name="sent_transfers"
    )
    receiver_bank = models.ForeignKey(
        Banks, on_delete=models.PROTECT, related_name="received_transfers"
    )
    amount = models.FloatField()
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "transfer"
