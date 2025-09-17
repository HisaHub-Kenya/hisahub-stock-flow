from firebase_admin import auth as firebase_auth
from django.conf import settings
from rest_framework import authentication, exceptions
from .models import User

class FirebaseAuthentication(authentication.BaseAuthentication):
    """
    Authenticate requests using Firebase ID tokens.
    """

    def authenticate(self, request):
        header = request.META.get('HTTP_AUTHORIZATION')
        if not header:
            return None
        if not header.startswith('Bearer '):
            return None
        id_token = header.split('Bearer ')[1]
        try:
            decoded = firebase_auth.verify_id_token(id_token, check_revoked=True)
        except firebase_auth.InvalidIdTokenError:
            raise exceptions.AuthenticationFailed("Invalid Firebase ID token.")
        except firebase_auth.ExpiredIdTokenError:
            raise exceptions.AuthenticationFailed("Expired Firebase ID token.")
        except firebase_auth.RevokedIdTokenError:
            raise exceptions.AuthenticationFailed("Revoked Firebase ID token.")
        except Exception as e:
            raise exceptions.AuthenticationFailed(f"Failed auth: {e}")

        uid = decoded.get('uid')
        if not uid:
            raise exceptions.AuthenticationFailed("Invalid token payload.")

        # Map to local user or create if missing
        try:
            user = User.objects.get(firebase_uid=uid)
        except User.DoesNotExist:
            # Optionally create a stub user in local DB
            email = decoded.get('email')
            user = User.objects.create(username=email or uid, email=email or '', firebase_uid=uid)
            user.save()
        # Attach firebase claims for role checks
        user.firebase_claims = decoded.get('claims', {})  # may be empty
        return (user, None)
