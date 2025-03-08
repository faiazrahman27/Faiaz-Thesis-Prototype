from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
import firebase_admin
from firebase_admin import auth
from django.contrib.auth import get_user_model

class FirebaseAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.META.get('HTTP_AUTHORIZATION')
        if not auth_header:
            raise AuthenticationFailed('No authorization header provided.')

        id_token = auth_header.split('Bearer ')[1]
        try:
            decoded_token = auth.verify_id_token(id_token)
            uid = decoded_token['uid']
            user = get_user_from_firebase(uid)
            return (user, None)
        except Exception as e:
            raise AuthenticationFailed(str(e))

def get_user_from_firebase(uid):
    User = get_user_model()
    try:
        user = User.objects.get(profile__firebase_uid=uid)
    except User.DoesNotExist:
        user = User.objects.create(username=uid, profile__firebase_uid=uid)
    return user
