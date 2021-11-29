from flask import current_app as app
from flask import Blueprint
from flask import request
from flask import jsonify
from flask import Response
import json

from caff import service
from responses import get_response_codes

caff_bp = Blueprint("caff_bp", __name__)
responses = get_response_codes("caff_bp")


@auth_bp.route("/download", methods=["GET"])
def download():
    pass


@auth_bp.route("/download/caff", methods=["GET"])
def download_caff():
    pass


@auth_bp.route("/download/gif", methods=["GET"])
def download_gif():
    pass


@auth_bp.route("/upload", methods=["POST"])
def upload():
    if request.json is None:
        return jsonify(responses["INFORMATION_MISSING"]), 400

    result = service.upload(request.json)
    return Response(response=json.dumps(result),
                    status=200,
                    mimetype="application/json")
