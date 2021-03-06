from rest_framework.decorators import api_view
from rest_framework.utils import json
from ...service.UserService import UserService
from ...service.SessionService import SessionService
from ...service.PhoneMessagingService import *
from ...serializer.serializers import AppUserSerializer
from ..utils import *
from django.http import HttpRequest


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


'''
    /api/user/log-out
'''


@api_view(['POST'])
def log_out_request(request) -> JsonResponse:
    if request.method == 'POST':
        try:
            user_data = json.loads(request.body.decode())
            session_token = user_data['token']
            session_service = SessionService()
            if session_service.token_validation(token=session_token) is None:
                JsonResponse({'error': 'Session Timeout'}, status=401)
            res = session_service.terminate_session(session_token)
            return JsonResponse({'msg': res}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=401)
    return JsonResponse({'error': 'Wrong request'}, status=401)


'''
    /api/user/profile-info
'''


@api_view(['GET'])
def handle_profile_info(request) -> JsonResponse:
    if request.method == 'GET':
        try:
            token = request.GET['token']
            user_name = request.GET['user']
            session_service = SessionService()
            session = session_service.retrieve_session(token)
            if session is None:
                return JsonResponse({'error': 'Session Time Out'}, status=401)
            else:
                session_service.update_session_data(session)
            return handle_get_request_profile_info(user_name)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=401)
    return JsonResponse({'error': 'Bad Request'}, status=401)


def handle_get_request_profile_info(user_name: str) -> JsonResponse:
    try:
        user_service = UserService()
        user = user_service.get_user_by_user_name(user_name)
        serializer = AppUserSerializer(user)
        return JsonResponse(serializer.data, status=200)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=401)


'''
    end /api/user/profile-info
'''


''' 
    /api/user/friends/<str>
'''


@api_view(['GET'])
def handle_user_friendships(request, user: str) -> JsonResponse:
    if request.method == 'GET':
        try:
            token = request.GET['token']
            session_service = SessionService()
            session = session_service.retrieve_session(token)
            if session is None:
                return JsonResponse({'error': 'Session time out'}, status=401)
            else:
                session_service.update_session_data(session)
            return handle_get_request_user_friendships(user)
        except Exception as e:
            return JsonResponse({'error': str(e)})
    return JsonResponse({'error': 'Bad request'}, status=401)


def handle_get_request_user_friendships(user_name: str) -> JsonResponse:
        try:
            user_service = UserService()
            user = user_service.get_user_by_user_name(user_name)
            if user is None:
                return JsonResponse({'error': 'user not found'})
            return JsonResponse(user_service.retrieve_user_friends(user), safe=False, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=401)


''' .../manage-account
'''


@api_view(['POST'])
def manage_account(request) -> JsonResponse:
    try:
        if request.method == 'POST':
            user_data = json.loads(request.body.decode())
            token = user_data['token']
            session_service = SessionService()
            current_session = session_service.retrieve_session(token)
            if current_session is None:
                return session_time_out()
            else:
                session_service.update_session_data(current_session)
            user_name = current_session.user.usr_name
            return handle_post_manage_account(request, user_name)
        return bad_request()
    except Exception as e:
        return exception_occurred(str(e))


def handle_post_manage_account(request, user_name: str) -> JsonResponse:
    user_data = json.loads(request.body.decode())
    email = user_data['email']
    phone = user_data['phone_number']
    birth_date = user_data['birth_date']
    service = UserService()
    res = service.update_user(user_name, phone, email, birth_date)
    return JsonResponse({'profile': res}, status=200)


@api_view(['POST'])
def manage_account_profile_picture(request: HttpRequest) -> JsonResponse:
    try:
        if request.method == 'POST':
            token = request.POST['token']
            service = SessionService()
            active_session = service.retrieve_session(token)
            if active_session is None:
                return session_time_out()
            else:
                service.update_session_data(active_session)
            user = active_session.user.usr_name
            return handle_post_request_manage_profile_picture(request, user)
        return bad_request()
    except Exception as e:
        return exception_occurred(str(e))


def handle_post_request_manage_profile_picture(request, user) -> JsonResponse:
    try:
        new_profile_picture_file = request.FILES['profile-image-file']
        service = UserService()
        result = service.update_profile_picture(user, new_profile_picture_file)
        return JsonResponse({'profile': result}, status=200)
    except Exception as e:
        return exception_occurred(str(e))
