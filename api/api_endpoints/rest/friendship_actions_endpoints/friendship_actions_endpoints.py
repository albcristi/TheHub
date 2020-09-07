from rest_framework.decorators import api_view
from django.http import JsonResponse
from ...service.friendship_service.FriendshipService import *
from ...service.UserService import UserService
from ...service.SessionService import SessionService
from ...serializer.serializers import AppUserSerializer
from ..utils import *


@api_view(['DELETE', 'POST', 'PUT'])
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
    if request.method == 'PUT':
        return handle_put_request_handling_pending_friendships(initiator, other_user)
    return bad_request()


def handle_post_request_handle_relationship(initiator: str, other_user: str) -> JsonResponse:
    try:
        user_service = UserService()
        initiator = user_service.get_user_by_user_name(initiator)
        other_user = user_service.get_user_by_user_name(other_user)
        if initiator is None or other_user is None:
            return JsonResponse({'result': False}, status=200)
        friendship_service = FriendshipService()
        result = friendship_service.accept_new_friendship(initiator, other_user)
        return JsonResponse({'result': result}, status=200)
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


def handle_put_request_handling_pending_friendships(initiator: str, other_user: str) -> JsonResponse:
    try:
        user_service = UserService()
        initiator = user_service.get_user_by_user_name(initiator)
        other_user = user_service.get_user_by_user_name(other_user)
        if initiator is None or other_user is None:
            return JsonResponse({'result': False}, status=200)
        service = FriendshipService()
        result = service.accept_new_friendship(initiator, other_user)
        return JsonResponse({'result': result}, status=200)
    except Exception as e:
        return exception_occurred(str(e))



"""" api/pending-friendships"""


@api_view(['POST'])
def handle_pending_friendships(request, initiator: str, other_user: str, token: str) -> JsonResponse:
    try:
        if request.method == "POST":
            service = SessionService()
            active_session = service.retrieve_session(token)
            if active_session is None:
                return session_time_out()
            else:
                service.update_session_data(active_session)
            return handle_post_request_handle_relationship(initiator, other_user)
        return bad_request()
    except Exception as e:
        return exception_occurred(str(e))


def handle_post_request_handling_pending_friendships(initiator: str, other_user: str) -> JsonResponse:
    try:
        user_service = UserService()
        initiator = user_service.get_user_by_user_name(initiator)
        other_user = user_service.get_user_by_user_name(other_user)
        if initiator is None or other_user is None:
            return JsonResponse({'result': False}, status=200)
        friendship_service = FriendshipService()
        result = friendship_service.send_friendship_request(initiator, other_user)
        return JsonResponse({'result': result}, status=200)
    except Exception:
        return JsonResponse({'result': False}, status=200)


@api_view(['GET'])
def handle_user_pending_friendships(request, user: str, token: str) -> JsonResponse:
    try:
        if request.method == 'GET':
            service = SessionService()
            print(user)
            session = service.retrieve_session(token)
            if session is None:
                return session_time_out()
            else:
                service.update_session_data(session)
            return handle_get_request_pending_friendships_of_user(user)
        return bad_request()
    except Exception as e:
        return exception_occurred(str(e))


def handle_get_request_pending_friendships_of_user(user: str) -> JsonResponse:
    try:
        service = FriendshipService()
        pending_friends = service.get_pending_friendships(user)
        pending_friends = [AppUserSerializer(pend).data for pend in pending_friends]
        return JsonResponse(pending_friends, safe=False, status=200)
    except Exception as e:
        return exception_occurred(str(e))
