from django.urls import path
from .friendship_actions_endpoints import *

urlpatterns = [
    path('initiator=<str:initiator>/other=<str:other_user>/<str:token>', handle_relationship,
         name='relationship-handler'),
    path('pending-friendships/<str:initiator>/other<str:other_user>/<str:token>', handle_pending_friendships,
         name='pending-relationship-handler')
]