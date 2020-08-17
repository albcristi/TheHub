from rest_framework.decorators import api_view
from django.http import JsonResponse
from .models import AppUsers, UserSession
import datetime

# Create your views here.
from rest_framework.utils import json


@api_view(['GET'])
def api_welcome_message(request):
    welcome_message = {'msg': 'Welcome to TheHub API'}

    return JsonResponse(welcome_message, status=200)


@api_view(['POST', 'GET'])
def verify_user_credentials(request):
    if request.method == 'GET':
        return JsonResponse({'info': 'not yet implemented'}, status=200)

    try:

        form_data = json.loads(request.body.decode())
        user_name = form_data['user_name']
        user_password = form_data['user_password']

        registered_user = AppUsers.get_user(user_name)

        if registered_user is None:
            raise ValueError('user does not exists')

        log_in_status = False
        session_token = 'not-valid'

        if registered_user.usr_password == user_password:
            log_in_status = True
            existing_session = UserSession.get_user_session(registered_user)
            if existing_session is None:
                session_token = UserSession.create_session(registered_user)
            else:
                session_token = existing_session.token
                existing_session.started_at = datetime.datetime.now()

        return JsonResponse({'cred_verified': log_in_status, 'token': session_token}, status=200)
    except Exception as e:
        return JsonResponse(
            {'error_message': str(e)},
            status=400
        )


