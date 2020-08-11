from .views import *
from django.urls import path, include

urlpatterns = [
    path('', api_welcome_message, name='welcome-message-the-hub'),
    path('do-log-in', verify_user_credentials, name='log-in-step'),
    path('user/', include('api_endpoints.rest.user_endpoints.urls'))
]
