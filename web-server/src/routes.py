from flask import Blueprint
from flask import Response
import json


hello_world_bp = Blueprint("hello_world_bp", __name__)


@hello_world_bp.route("/hello", methods=["GET"])
def hello_world():
    return Response(response=json.dumps({"result": "Hello World!"}),
                    status=200,
                    mimetype="application/json")
