from flask import current_app as app
from flask import Blueprint
from flask import request
from flask import jsonify
from flask import Response
from flask import session
import json


from auth import service
from auth import exceptions
from auth.internal_api import get_username, login_required, authorize
from responses import get_response_codes


auth_bp = Blueprint("auth_bp", __name__)
responses = get_response_codes("auth")


@auth_bp.route("/login", methods=["POST"])
def login():
    if request.json is None:
        return jsonify(responses["INFORMATION_MISSING"]), 400

    username = request.json["username"]
    password = request.json["password"]

    app.logger.info(f"Login request with username: {username}")

    try:
        user = service.login(username=username,
                             password=password,
                             session=session)
    except exceptions.AlreadyLoggedInException:
        return jsonify(responses["ALREADY_LOGGED_IN"]), 400
    except exceptions.InvalidCredentialsException:
        return jsonify(responses["INVALID_CREDENTIALS"]), 400
    except exceptions.AuthException:
        return jsonify(responses["INTERNAL_SERVER_ERROR"]), 400

    app.logger.info(f"User successfully logged in with username: {username}")

    return Response(response=json.dumps(user),
                    status=200,
                    mimetype="application/json")


@auth_bp.route("/logout", methods=["POST"])
@login_required
def logout():
    username = get_username()
    app.logger.info(f"User trying to log out with username: {username}")

    service.logout(session=session)
    app.logger.info(f"User successfully logged out with username: {username}")

    return jsonify(responses["SUCCESFULLY_LOGGED_OUT"]), 200


@auth_bp.route("/signup", methods=["POST"])
def signup():
    if request.json is None:
        return jsonify(responses["INFORMATION_MISSING"]), 400

    app.logger.info(f"New user trying to sign up with username: {username}")

    signup_data = {
        "username": str(request.json['username']),
        "password": str(request.json['password'])
    }

    try:
        result = service.signup(signup_data)
    except exceptions.UsernameAlreadyExistsException:
        return jsonify(responses["USERNAME_ALREADY_EXIST"]), 400
    except exceptions.AuthException:
        return jsonify(responses["INTERNAL_SERVER_ERROR"]), 400

    app.logger.info(f"New user successfully signied up with username: {username}")

    return jsonify(responses["SIGNED_UP_SUCCESFULLY"]), 200

