from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class UserProfile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name='profile')
    firebase_uid = models.CharField(max_length=255, unique=True, null=True, blank=True)
    document = models.ImageField(
        upload_to='media/document/', null=True, blank=True)
    address = models.CharField(max_length=100, null=True, blank=True)
    passport_number=models.CharField(max_length=20, null=True, blank=True)
    blood_group=models.CharField(max_length=10, null=True, blank=True)
    occupation=models.CharField(max_length=20, null=True, blank=True)



