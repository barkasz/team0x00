from flask import current_app as app
from flask import Blueprint
from flask import request
from flask import jsonify
from flask import Response
import json


from auth import service
from responses import get_response_codes


auth_bp = Blueprint("auth_bp", __name__)
responses = get_response_codes("auth")


@auth_bp.route("/login", methods=["POST"])
def login():
    if request.json is None:
        return jsonify(responses["INFORMATION_MISSING"]), 400

    username = request.json["username"]
    password = request.json["password"]
    user = service.login(username=username,
                         password=password)

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

    if request.json is None:
        # TODO hadle exception
        pass

    result = service.signup(request.json)
    return Response(response=json.dumps(result),
                    status=200,
                    mimetype="application/json")

