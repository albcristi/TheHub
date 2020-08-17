from rest_framework.decorators import api_view
from rest_framework.utils import json
from ...service.SessionService import SessionService
from ...service.post_system.PostService import PostService
from ...models import AppUsers
from django.http import JsonResponse


@api_view(['POST'])
def create_user_post(request):
    form_data = json.loads(request.body.decode())
    session_token = form_data['token']
    session_service = SessionService()
    if not session_service.token_validation(session_token):
        return JsonResponse({'error_message': 'SESSION TIME OUT: '+session_token}, status=401)
    if request.method == 'POST':
        return handle_post_create_user_post(request, session_service.retrieve_user_by_session_token(session_token))
    return JsonResponse({'error_message': 'wrong_request'}, status=401)


def handle_post_create_user_post(request, current_user: AppUsers) ->JsonResponse:
    res = ""
    try:
        form_data = json.loads(request.body.decode())
        post_title = form_data['post_title']
        post_text = form_data['post_text']

        post_service = PostService()
        res = post_service.create_post(title=post_title,text_content=post_text, created_by=current_user)
    except Exception as e:
        return JsonResponse({'error_message': 'operation failed'}, status=401)
    operation_result = False
    if res == post_title:
        operation_result = True
    return JsonResponse({'result': operation_result}, status=200)


