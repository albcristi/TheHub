from django.urls import path
from .user_endpoints import *

urlpatterns = [
    path('<int:user_id>', operate_user_information, name='get_user_data')
]