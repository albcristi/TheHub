from django.http import JsonResponse


def bad_request() -> JsonResponse:
    return JsonResponse({'error': 'BAD REQUEST'}, status=401)


def session_time_out() -> JsonResponse:
    return JsonResponse({'error': 'SESSION TIME OUT'}, status=401)


def exception_occurred(error_message: str) -> JsonResponse:
    return JsonResponse({'error': error_message}, status=401)
