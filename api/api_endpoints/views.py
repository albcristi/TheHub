from rest_framework.decorators import api_view
from django.http import JsonResponse

# Create your views here.
import os

@api_view(['GET'])
def api_welcome_message(request):
    welcome_message = {'msg': 'Welcome to TheHub API and'+os.environ['PHONE_NUMBER']}

    return JsonResponse(welcome_message, status=200)

