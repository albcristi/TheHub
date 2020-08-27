from django.urls import path
from .user_endpoints import *

urlpatterns = [
    path('account', create_new_user, name='new-account-creation'),
    path('<int:user_id>', operate_user_information, name='get_user_data'),
    path('<str:user_name>', handle_username_unicity, name='is-username-taken')
]