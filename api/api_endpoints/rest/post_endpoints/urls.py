from django.urls import path
from .post_endpoints import *

urlpatterns = [
    path('', create_user_post, name='new-post-creation')
]

