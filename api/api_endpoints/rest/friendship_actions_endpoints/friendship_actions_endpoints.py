from rest_framework.decorators import api_view
from django.http import JsonResponse
from ...service.friendship_service.FriendshipService import *
from ...service.UserService import UserService
from ...service.SessionService import SessionService
from ..utils import *


@api_view(['DELETE', 'POST'])
def handle_relationship(request, initiator: str, other_user: str, token: str) -> JsonResponse:
    session_service = SessionService()
    session = session_service.retrieve_session(token)
    if session is None:
        return session_time_out()
    else:
        session_service.update_session_data(session)
    if request.method == 'DELETE':
        return handle_remove_request_handle_relationship(initiator, other_user)
    if request.method == 'POST':
        return handle_post_request_handle_relationship(initiator, other_user)
    return bad_request()


def handle_post_request_handle_relationship(initiator: str, other_user: str) -> JsonResponse:
    try:
        user_service = UserService()
        initiator = user_service.get_user_by_user_name(initiator)
        other_user = user_service.get_user_by_user_name(other_user)
        if initiator is None or other_user is None:
            return JsonResponse({'result': False}, status=200)
        friendship_service = FriendshipService()
        result = friendship_service.create_friendship(initiator, other_user)
        return JsonResponse({'status': result}, status=200)
    except Exception as e:
        return exception_occurred(str(e))


def handle_remove_request_handle_relationship(initiator: str, other_user: str) -> JsonResponse:
        try:
            user_service = UserService()
            initiator = user_service.get_user_by_user_name(initiator)
            other_user = user_service.get_user_by_user_name(other_user)
            if initiator is None or other_user is None:
                return JsonResponse({'result': False}, status=200)
            friendship_service = FriendshipService()
            result = friendship_service.remove_friendship(initiator, other_user)
            return JsonResponse({'result': result}, status=200)
        except Exception as e:
            return exception_occurred(str(e))
