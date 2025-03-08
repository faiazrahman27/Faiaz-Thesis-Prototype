import firebase_admin
from firebase_admin import auth
import requests

from .models import UserProfile
from .serializers import UserSerializer
from accounts.models import Banks
from django.contrib.auth.models import User

from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import (
    APIException,
    AuthenticationFailed,
)


class UserViewSet(viewsets.ModelViewSet):
    """
    A ViewSet for managing users with groups, organizations, branches, and profile.
    """

    queryset = User.objects.all()
    serializer_class = UserSerializer


class FirebaseSignUpView(APIView):
    def post(self, request, *args, **kwargs):
        # Extract data from the request
        email = request.data.get("email")
        password = request.data.get("password")
        first_name = request.data.get("first_name", "")

        document = request.data.get("document", "")
        address = request.data.get("address", "")
        passport_number = request.data.get("passport_number", "")
        blood_group = request.data.get("blood_group", "")
        occupation = request.data.get("occupation", "")

        if not email or not password:
            return Response({"error": "Email and password are required"}, status=400)

        try:
            # Create user in Firebase
            firebase_user = auth.create_user(
                email=email,
                password=password,
                display_name=first_name,
            )

            # Create the Django User model
            user = User.objects.create_user(
                username=email, email=email, first_name=first_name
            )
            UserProfile.objects.create(
                user=user,
                firebase_uid=firebase_user.uid,
                document=document,
                address=address,
                passport_number=passport_number,
                blood_group=blood_group,
                occupation=occupation,
            )
            # create User's bank
            Banks.objects.create(user=user)
            return Response(
                {"message": "User signed up successfully", "email": user.email},
                status=201,
            )

        except firebase_admin.exceptions.FirebaseError as e:
            raise APIException(f"Firebase Error: {str(e)}")
        except Exception as e:
            raise APIException(f"Error during sign-up: {str(e)}")


class FirebaseLoginView(APIView):
    def post(self, request, *args, **kwargs):
        id_token = request.data.get("idToken")
        if not id_token:
            return Response({"error": "No ID token provided"}, status=400)

        try:
            # Verify Firebase token
            decoded_token = auth.verify_id_token(id_token)
            firebase_uid = decoded_token.get("uid")
            email = decoded_token.get("email")

            # Check if user exists
            try:
                user = User.objects.get(
                    username=email, profile__firebase_uid=firebase_uid
                )
            except User.DoesNotExist:
                return Response(
                    {"error": "User does not exist. Please sign up."}, status=404
                )

            return Response(
                {"message": "User logged in successfully", "id": user.id},
                status=200,
            )
        except Exception as e:
            raise AuthenticationFailed(f"Error during login: {str(e)}")
