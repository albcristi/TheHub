from django.urls import path
from .post_endpoints import *

urlpatterns = [
    path('', handle_posts_endpoint, name='new-post-creation')
]

