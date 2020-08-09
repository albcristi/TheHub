from rest_framework.decorators import api_view
from django.http import JsonResponse

# Create your views here.


@api_view(['GET'])
def api_welcome_message(request):
    welcome_message = {'msg': 'Welcome to TheHub API'}

    return JsonResponse(welcome_message, status=200)


@api_view(['POST'])
def verify_user_credentials(request):
    try:
        # TODO
        user_name = request.POST['user_name']
        user_password = request.POST['user_password']
        return JsonResponse({'a': user_name}, status=200)
    except Exception as e:
        return JsonResponse(
            {'error_message': e},
            status=400
        )


@api_view(['GET'])
def verify_user_credentials(request):
    # TODO
    return JsonResponse({'b': 'aaa'})
