from django.urls import path
from .user_endpoints import *

urlpatterns = [
    path('account', send_user_verification_code, name='new-account-access-key'),
    path('new-account', handle_new_user, name='new-account'),
    path('profile-info', handle_profile_info, name='profile-information'),
    path('log-out', log_out_request, name='log-out-user'),
    path('<int:user_id>', operate_user_information, name='get_user_data'),
    path('<str:user_name>', handle_username_unicity, name='is-username-taken')
]