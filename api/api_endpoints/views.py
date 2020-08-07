from rest_framework.decorators import api_view
from django.http import JsonResponse

# Create your views here.


@api_view(['GET'])
def api_welcome_message(request):
    welcome_message = {'msg': 'Welcome to TheHub API'}
    return JsonResponse(welcome_message, status=200)

