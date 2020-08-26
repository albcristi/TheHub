from django.urls import path
from .phone_messaging_endpoints import *

urlpatterns = [
    path('<str:user_name>', send_new_account_access_key, name='new-post-creation'),

]

