from .views import *
from django.urls import path, include

urlpatterns = [
    path('', api_welcome_message, name='welcome-message-the-hub'),
    path('do-log-in', verify_user_credentials, name='log-in-step'),
    path('user/', include('api_endpoints.rest.user_endpoints.urls')),
    path('posts/', include('api_endpoints.rest.post_endpoints.urls')),
    path('messaging/', include('api_endpoints.rest.phone-messaging.urls')),
    path('relations/', include('api_endpoints.rest.friendship_actions_endpoints.urls'))
]
