from rest_framework import serializers
from .models import Banks, Deposit, Withdrawal, Transfer


class BanksSerializer(serializers.ModelSerializer):
    email = serializers.CharField(source="user.email", read_only=True)

    class Meta:
        model = Banks
        fields = "__all__"


class DepositSerializer(serializers.ModelSerializer):
    class Meta:
        model = Deposit
        fields = "__all__"

    def create(self, validated_data):
        bank = validated_data["bank"]
        bank.balance += validated_data["amount"]
        bank.save()
        return super().create(validated_data)


class WithdrawalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Withdrawal
        fields = "__all__"
        extra_kwargs = {"tax_deduction": {"read_only": True, "required": False}}

    def create(self, validated_data):
        bank = validated_data["bank"]
        amount = validated_data["amount"]

        # Calculate the 3% tax deduction
        tax_deduction = round(amount * 0.03, 2)
        net_amount = amount + tax_deduction  # Total deduction from bank balance

        if bank.balance < net_amount:
            raise serializers.ValidationError("Insufficient balance.")

        # Update bank balance after deducting the total amount
        bank.balance -= net_amount
        bank.save()

        # Save the tax deduction value in the Withdrawal model
        validated_data["tax_deduction"] = tax_deduction

        return super().create(validated_data)


class TransferSerializer(serializers.ModelSerializer):
    sender_bank_email = serializers.CharField(
        source="sender_bank.user.email", read_only=True
    )
    receiver_bank_email = serializers.CharField(
        source="receiver_bank.user.email", read_only=True
    )

    class Meta:
        model = Transfer
        fields = "__all__"
        extra_kwargs = {"receiver_bank": {"read_only": True, "required": False}}

    def create(self, validated_data):
        sender_bank = validated_data["sender_bank"]
        amount = validated_data["amount"]

        # Get receiver bank using email
        receiver_email = self.initial_data.get("receiver_email")
        if not receiver_email:
            raise serializers.ValidationError("Receiver email is required.")

        try:
            receiver_bank = Banks.objects.get(user__email=receiver_email)
        except Banks.DoesNotExist:
            raise serializers.ValidationError(
                "No bank account found for the provided email."
            )

        # Ensure sufficient balance in sender's account
        if sender_bank.balance < amount:
            raise serializers.ValidationError(
                "Insufficient balance in sender's account."
            )

        # Update balances
        sender_bank.balance -= amount
        receiver_bank.balance += amount
        sender_bank.save()
        receiver_bank.save()

        # Add receiver_bank to validated_data
        validated_data["receiver_bank"] = receiver_bank

        return super().create(validated_data)
