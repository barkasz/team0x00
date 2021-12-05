from flask import current_app as app
from flask import Blueprint
from flask import request
from flask import jsonify
from flask import Response
from flask import session
import json


from auth import service
from auth import exceptions
from auth.roles import Role
from auth.internal_api import login_required, authorize
from responses import get_response_codes


auth_bp = Blueprint("auth_bp", __name__)
responses = get_response_codes("auth")


@auth_bp.route("/login", methods=["POST"])
def login():
    if request.json is None:
        return jsonify(responses["INFORMATION_MISSING"]), 400

    username = request.json["username"]
    password = request.json["password"]

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

    return Response(response=json.dumps(user),
                    status=200,
                    mimetype="application/json")


@auth_bp.route("/logout", methods=["POST"])
@login_required
def logout():
    service.logout(session=session)

    return jsonify(responses["SUCCESFULLY_LOGGED_OUT"]), 200


@auth_bp.route("/signup", methods=["POST"])
def signup():
    if request.json is None:
        return jsonify(responses["INFORMATION_MISSING"]), 400

    signup_data = {
        "username": str(request.json['username']),
        "password": str(request.json['password'])
    }

    try:
        result = service.signup(signup_data)
    except exceptions.UsernameAlreadyExistsException:
        return jsonify(responses["ALREADY_LOGGED_IN"]), 400
    except exceptions.AuthException:
        return jsonify(responses["INTERNAL_SERVER_ERROR"]), 400

    return jsonify(responses["SIGNED_UP_SUCCESFULLY"]), 200


@auth_bp.route("/<user_id>/role/admin", methods=["PUT"])
@login_required
@authorize(roles=[Role.ADMIN])
def grant_admin_permission(user_id):
    try:
        service.grant_admin_permission(user_id)
    except exceptions.UserNotExistsException:
        return jsonify(responses["USER_NOT_EXISTS"]), 400
    except exceptions.AuthException:
        return jsonify(responses["PERMISSION_GRANT_FAILED"]), 400

    return jsonify(responses["PERMISSION_GRANTED"]), 200

