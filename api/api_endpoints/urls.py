from .views import api_welcome_message

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', api_welcome_message, name='welcome-message-the-hub')
]
