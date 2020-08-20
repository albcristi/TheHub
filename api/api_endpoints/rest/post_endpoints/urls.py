from django.urls import path
from .post_endpoints import *

urlpatterns = [
    path('', handle_posts_endpoint, name='new-post-creation'),
    path('likes/<int:post_id>', handle_post_likes_endpoint, name='handle-post-likes')
]

