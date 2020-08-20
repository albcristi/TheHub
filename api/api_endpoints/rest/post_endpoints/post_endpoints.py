from rest_framework.decorators import api_view
from rest_framework.utils import json
from ...service.SessionService import SessionService
from ...service.UserService import UserService
from ...service.post_system.PostService import PostService
from ...models import AppUsers
from ...serializer.post_system.post_syt_serializers import PostSerializer, PostCommentSerializer
from django.http import JsonResponse

'''
     /api/posts/
'''


@api_view(['POST', 'GET'])
def handle_posts_endpoint(request):
    session_service = SessionService()
    if request.method == 'POST':
        form_data = json.loads(request.body.decode())
        session_token = form_data['token']
        if not session_service.token_validation(session_token):
            return JsonResponse({'error_message': 'SESSION TIME OUT: ' + session_token}, status=401)
        else:
            session_service.update_session_data(session_service.retrieve_session(session_token))
        return handle_post_create_user_post(request,
                                            session_service.retrieve_user_by_session_token(session_token))

    if request.method == 'GET':
        session_token = request.GET['token']
        if not session_service.token_validation(session_token):
            return JsonResponse({'error_message': 'SESSION TIME OUT: ' + session_token}, status=401)
        else:
            session_service.update_session_data(session_service.retrieve_session(session_token))
        no_page = request.GET['page']
        no_per_page = request.GET['no_per']
        return handle_get_post_endpoint(session_service.retrieve_user_by_session_token(session_token),
                                        no_page,
                                        no_per_page)
    return JsonResponse({'error_message': 'wrong_request'}, status=401)


def handle_post_create_user_post(request, current_user: AppUsers) -> JsonResponse:
    try:
        form_data = json.loads(request.body.decode())
        post_title = form_data['post_title']
        post_text = form_data['post_text']

        post_service = PostService()
        res = post_service.create_post(title=post_title,
                                       text_content=post_text,
                                       created_by=current_user)
    except Exception as e:
        return JsonResponse({'error_message': e}, status=401)
    operation_result = False
    if res == post_title:
        operation_result = True
    return JsonResponse({'result': operation_result}, status=200)


def handle_get_post_endpoint(current_user: AppUsers, no_page: int, no_per_page: int) -> JsonResponse:
    post_service = PostService()
    user_service = UserService()
    posts = set(post_service.return_post_from_friends(current_user.usr_name, no_page, no_per_page))
    result = [PostSerializer(post).data for post in posts]
    for res in result:
        res['user'] = user_service.get_user(res['user']).usr_name
    return JsonResponse({'result': result}, status=200)


''' 
    end /api/posts/
'''

'''
   /api/posts/likes/<int:post>
'''


@api_view(['GET', 'POST'])
def handle_post_likes_endpoint(request, post_id: int):
    session_service = SessionService()
    if request.method == 'GET':  # retrieves the likes for a given post
        session_token = request.GET['token']
        session = session_service.retrieve_session(session_token)
        if session is None:
            return JsonResponse({'error_message': 'SESSION TIME OUT: ' + session_token}, status=401)
        else:
            session_service.update_session_data(session)
        return handle_get_post_likes_endpoint(post_id)

    if request.method == 'POST':  # creates a like for a given post
        try:
            form_data = json.loads(request.body.decode())
            session_token = form_data['token']
            user_name = form_data['user_name']
            session = session_service.retrieve_session(session_token)
            if session is None:
                return JsonResponse({'error_message': 'SESSION TIME OUT: ' + session_token}, status=401)
            else:  # update session data
                session_service.update_session_data(session)
            user_service = UserService()
            user = user_service.get_user_by_user_name(user_name)
            if user is None:
                return JsonResponse({'msg': False}, status=200)
            return handle_post_method_post_likes_endpoint(post_id, user)
        except Exception:
            return JsonResponse({'error_message': 'BAD REQUEST'}, status=401)

    return JsonResponse({'error_message': 'wrong_request'}, status=401)


def handle_get_post_likes_endpoint(post_id: int) -> JsonResponse:
    post_service = PostService()
    return JsonResponse({'likes': post_service.return_post_likes(post_id)}, status=200)


def handle_post_method_post_likes_endpoint(post_id: int, user: AppUsers) -> JsonResponse:
    post_service = PostService()
    return JsonResponse({'msg': post_service.like_post(post_id, user)}, status=200)


'''
   end /api/posts/likes/<int:post_id>
'''

'''
    /api/posts/comments/<int:post_id>
'''


@api_view(['GET'])
def handle_comments_for_post(request, post_id):
    session_service = SessionService()
    if request.method == 'GET':  # retrieves existing comments for a post
        session_token = request.GET['token']
        session = session_service.retrieve_session(session_token)
        if session is None:
            return JsonResponse({'error_message': 'SESSION TIME OUT: ' + session_token}, status=401)
        else:
            session_service.update_session_data(session)
        return handle_get_comments_for_post(post_id)

    return JsonResponse({'error_message': 'BAD REQUEST'}, status=401)


def handle_get_comments_for_post(post_id):
    try:
        post_service = PostService()
        user_service = UserService()
        comments = set(post_service.retrieve_comments(post_id))
        comments_transformed = []
        for comment in comments:
            serializer = PostCommentSerializer(comment)
            o = serializer.data
            o['app_user'] = user_service.get_user(serializer.data['app_user']).usr_name
            comments_transformed.append(o)
        return JsonResponse({"comments": comments_transformed}, status=200)
    except Exception:
        return JsonResponse({'error_message': 'SOMETHING WENT REALLY WRONG'}, status=401)
