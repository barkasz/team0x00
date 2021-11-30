from flask import current_app as app
from flask import Blueprint
from flask import request
from flask import jsonify
from flask import Response
import json


from auth import service
from auth import exceptions
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
        user = service.login(username=username, password=password)
    except exceptions.InvalidCredentialsException:
        return jsonify(responses["INVALID_CREDENTIALS"]), 400
    except exceptions.AuthException:
        return jsonify(responses["INTERNAL_SERVER_ERROR"]), 400

    return Response(response=json.dumps(user),
                    status=200,
                    mimetype="application/json")


@auth_bp.route("/logout", methods=["POST"])
def logout():
    result = service.logout()
    return Response(response=json.dumps(result),
                    status=200,
                    mimetype="application/json")


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

