from app import app
from flask import session
from flask import jsonify
import functools


from responses import get_response_codes


responses = get_response_codes("auth")


def login_required(func):
    """Make sure user is logged in before proceeding"""

    @functools.wraps(func)
    def wrapper_login_required(*args, **kwargs):
        if session.get("logged_in") is None:
            return jsonify(responses["LOGIN_REQUIRED"]), 400
        return func(*args, **kwargs)

    return wrapper_login_required


def authorize(roles):
    """Make sure user that has the right permission"""

    def real_authorize(func):
        @functools.wraps(func)
        def wrapper_authorize(*args, **kwargs):
            if session.get("role") not in roles:
                return jsonify(responses["PERMISSION_DENIED"]), 400
            return func(*args, **kwargs)
        return wrapper_authorize
    return real_authorize


def get_username():
    return session.get("username")

