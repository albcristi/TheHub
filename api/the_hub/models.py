from django.db import models

# Create your models here.


class AppUsers(models.Model):
    usr_id = models.AutoField(primary_key=True)
    usr_name = models.CharField(max_length=200, unique=True)
    usr_password = models.CharField(max_length=200)
    usr_email = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=20)
    birth_date = models.DateField()


