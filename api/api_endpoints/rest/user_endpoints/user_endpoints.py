from rest_framework.decorators import api_view
from rest_framework.utils import json
from ...service.UserService import UserService
from ...service.PhoneMessagingService import *
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


@api_view(['GET'])
def handle_username_unicity(request, user_name: str) -> JsonResponse:
    if request.method == 'GET':
        user_service = UserService()
        result = user_service.username_is_unique(user_name)
        return JsonResponse({'availability': result}, status=200)
    return JsonResponse({'err': 'BAD REQUEST'}, status=401)


'''
    /api/user/account
'''


@api_view(['GET'])
def send_user_verification_code(request) -> JsonResponse:
    if request.method == 'GET':
        try:
            return handle_get_new_user_endpoint(request)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=401)
    return JsonResponse({'err': 'BAD REQUEST'}, status=401)


def handle_get_new_user_endpoint(request) -> JsonResponse:
    try:
        phone_number = request.GET['phone_number']
        user_name = request.GET['user_name']
        access_key = send_verification_code_to_new_user(phone_number, user_name)
        return JsonResponse({'access_key': access_key, 'failed': False, 'phone_number': os.environ['PHONE_NUMBER']})
    except Exception as e:
        return JsonResponse({'access_key': str(e), 'failed': True})


'''
   end /api/user/account
'''


'''
    /api/user/new-account
'''


@api_view(['POST'])
def handle_new_user(request) -> JsonResponse:
    if request.method == 'POST':
        try:
            return handle_post_new_user_endpoint(request)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=401)


def handle_post_new_user_endpoint(request) -> JsonResponse:
    try:
        user_data = json.loads(request.body.decode())
        user_name = user_data['user_name']
        email = user_data['email']
        phone_number = user_data['phone_number']
        user_password = user_data['password']
        user_service = UserService()
        user_service.create_user(user_name, user_password, email, phone_number)
        return JsonResponse({'status': not user_service.username_is_unique(user_name)})
    except Exception as e:
        return JsonResponse({'error': e}, status=401)


'''
     end /api/user/new-account
'''