from flask import current_app as app
from flask import Blueprint
from flask import request
from flask import Response
import json

from auth import service


auth_bp = Blueprint("auth_bp", __name__)


@auth_bp.route("/login", methods=["POST"])
def login():
    if request.json is None:
        # TODO hadle exception
        pass

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
        # TODO hadle exception
        pass

    result = service.signup(request.json)
    return Response(response=json.dumps(result),
                    status=200,
                    mimetype="application/json")

