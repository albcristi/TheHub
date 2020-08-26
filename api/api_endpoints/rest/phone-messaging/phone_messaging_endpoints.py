from rest_framework.decorators import api_view
from rest_framework.utils import json
from django.http import JsonResponse
from ...service.PhoneMessagingService import *


@api_view(['GET'])
def send_new_account_access_key(request, user_name) -> JsonResponse:
    if request.method == 'GET':
        phone_number = request.GET['phone_number']
        return JsonResponse({'access_key': send_verification_code_to_new_user(phone_number, user_name)})
    return JsonResponse({}, status=401)
