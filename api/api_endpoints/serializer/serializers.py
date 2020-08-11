from rest_framework import serializers
from ..models import AppUsers, UserSession


class AppUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppUsers
        fields = ['usr_id',
                  'usr_name',
                  'usr_email',
                  'phone_number',
                  'birth_date']


class UserSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSession
        fields = ['session_id',
                  'started_at',
                  'token']
