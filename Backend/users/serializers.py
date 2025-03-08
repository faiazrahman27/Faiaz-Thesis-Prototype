from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from .models import UserProfile
from accounts.models import Banks


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        exclude = ["user","firebase_uid"]


class BanksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Banks
        exclude = ["user"]


class UserSerializer(serializers.ModelSerializer):
    bank = BanksSerializer(read_only=True)
    profile = UserProfileSerializer()

    class Meta:
        model = User
        fields = ["id", "username", "first_name", "email", "password", "profile", "bank"]
        extra_kwargs = {"password": {"write_only": True, "required": False}}

    def create(self, validated_data):
        profile_data = validated_data.pop("profile", {})
        validated_data["password"] = make_password(validated_data["password"])
        user = User.objects.create(**validated_data)
        UserProfile.objects.create(user=user, **profile_data)
        return user

    def update(self, instance, validated_data):
        profile_data = validated_data.pop("profile", None)

        if "password" in validated_data:
            instance.password = make_password(validated_data.pop("password"))

        instance = super().update(instance, validated_data)
        if profile_data:
            profile = instance.profile
            for attr, value in profile_data.items():
                setattr(profile, attr, value)
            profile.save()

        return instance
