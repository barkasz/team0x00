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
            return jsonify(responses["PERMISSION_DENIED"]), 400
        return func(*args, **kwargs)

    return wrapper_login_required
