from django.db import models
from django.utils.crypto import get_random_string
import datetime
# Create your models here.


def user_profile_pic_location(instance, filename):
    return "users/%s/%s" % (instance.usr_name, filename)


class AppUsers(models.Model):
    usr_id = models.AutoField(primary_key=True)
    usr_name = models.CharField(max_length=200, unique=True)
    usr_password = models.CharField(max_length=200)
    usr_email = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=20)
    birth_date = models.DateField()
    profile_picture = models.ImageField(null=True, upload_to=user_profile_pic_location)

    def __str__(self):
        return str(self.usr_name)

    @staticmethod
    def get_user(user_name):
        users = AppUsers.objects.filter(usr_name=user_name)
        if users.count() == 0:
            return None
        return users[0]


class FriendList(models.Model):
    friendship_owner = models.ForeignKey(
        AppUsers,
        related_name='current_friendships',
        on_delete=models.CASCADE
    )
    friend_with = models.ForeignKey(
        AppUsers,
        related_name='involved_in_friendships',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return str(self.friendship_owner)+" is friend with "+str(self.friend_with)


'''
    In the moment a user performs a successful log in
    a session will be created for that user, being 
    granted a unique session token 
'''


class UserSession(models.Model):
    session_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(
        AppUsers,
        related_name='current_sessions',
        on_delete=models.CASCADE
    )
    started_at = models.DateTimeField()
    token = models.CharField(max_length=400, unique=True)

    def __str__(self):
        return "Started at: "+str(self.started_at)+" with token: "+str(self.token)

    @staticmethod
    def generate_session_token():
        while True:
            generated_token = get_random_string(15)
            if UserSession.objects.filter(token=generated_token):
                continue
            return generated_token

    @staticmethod
    def get_user_session(user):
        sessions = UserSession.objects.filter(user=user)
        if sessions.count() == 0:
            return None
        return sessions[0]

    @staticmethod
    def create_session(user):
        user_session = UserSession()
        user_session.user = user
        user_session.started_at = datetime.datetime.now()
        user_session.token = user_session.generate_session_token()
        session_token = user_session.token
        user_session.save()
        return session_token
