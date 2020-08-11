from rest_framework.decorators import api_view
from rest_framework.utils import json

from ...service.SessionService import SessionService
from ...service.UserService import UserService
from ...serializer.serializers import AppUserSerializer
from django.http import JsonResponse


@api_view(['GET'])
def operate_user_information(request, user_id: int) -> JsonResponse:
    #  TODO: INTRODUCE SESSION VERIFICATION
    if request.method == 'GET':
        return operate_user_information_handle_get_request(user_id)
    return JsonResponse({'error_message': 'wrong_request'}, status=401)


def operate_user_information_handle_get_request(user_id: int) -> JsonResponse:
    """"
        Retrieves user information based on user id or an empty
        in case there will be no user with the corresponding id
    """
    user_service = UserService()
    user = user_service.get_user(user_id)
    serializer = AppUserSerializer(user)
    return JsonResponse(serializer.data, status=200)


