from flask import current_app as app
from flask import Blueprint
from flask import jsonify
import json


from responses import get_response_codes


post_bp = Blueprint("post_bp", __name__)
responses = get_response_codes("auth") # TODO


@post_bp.route("/post/hello", methods=["GET"])
def hello():
    return jsonify(responses["INFORMATION_MISSING"]), 200

