from .views import *

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', api_welcome_message, name='welcome-message-the-hub'),
    path('do-log-in', verify_user_credentials, name='log-in-step')
]
