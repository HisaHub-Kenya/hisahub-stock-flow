from rest_framework import permissions

class IsBroker(permissions.BasePermission):
    def has_permission(self, request, view):
        user = request.user
        if not user or not user.is_authenticated:
            return False
        # check local role or firebase custom claim
        if getattr(user, 'role', None) == 'broker':
            return True
        # firebase custom claims fallback
        claims = getattr(user, 'firebase_claims', {})
        if claims.get('role') == 'broker':
            return True
        return False
