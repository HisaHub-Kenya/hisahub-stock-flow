import logging
import traceback
from django.http import JsonResponse

class GlobalExceptionMiddleware:
    """
    Middleware to catch all unhandled exceptions and return JSON error responses.
    Logs errors to both console and file.
    """
    def __init__(self, get_response):
        self.get_response = get_response
        self.logger = logging.getLogger("django")

    def __call__(self, request):
        try:
            return self.get_response(request)
        except Exception as exc:
            # Log the full traceback
            tb = traceback.format_exc()
            self.logger.error(f"Unhandled Exception: {exc}\n{tb}")
            # Return a structured JSON error response
            return JsonResponse({
                "error": str(exc),
                "type": exc.__class__.__name__,
                "trace": tb
            }, status=500)
