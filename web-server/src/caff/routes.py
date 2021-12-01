import os

from flask import current_app as app
from flask import Flask
from flask import Blueprint
from flask import request
from flask import jsonify
from flask import Response
from flask import send_from_directory
from flask import abort
import json
from collections import namedtuple

from caff import service
from caff import exceptions
from responses import get_response_codes
from auth import internal_api as auth_api
from user.roles import Role


caff_bp = Blueprint("caff_bp", __name__)
responses = get_response_codes("caff")
responses_com = get_response_codes("common")


ALLOWED_EXTENSIONS = {'caff'}
ALLOWED_FILE = {'caff', 'gif'}


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@caff_bp.route("/download/<file_type>/<file_id>", methods=["GET"])
@auth_api.login_required
def download_file(file_type, file_id):
    if file_type not in ALLOWED_FILE:
        return jsonify(responses_com["INVALID_ENDPOINT"]), 400

    try:
        filename = service.download_file(file_id, file_type)
    except exceptions.CaffException:
        return jsonify(responses["FILE_MISSING"]), 400

    if filename is None:
        return jsonify(responses["FILE_MISSING"]), 400

    if filename not in os.listdir(app.config['UPLOAD_FOLDER']):
        return jsonify(responses["FILE_MISSING"]), 400

    #safely send the file
    resp = send_from_directory(app.config['UPLOAD_FOLDER'], filename)

    if resp.status_code != 200:
        return jsonify(responses["FILE_MISSING"]), 400

    return resp


@caff_bp.route("/upload", methods=["POST"])
@auth_api.login_required
def upload():
    if 'file' not in request.files:
        return jsonify(responses["FILE_MISSING_REQUEST"]), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify(responses["FILE_MISSING_REQUEST"]), 400

    if not file or not allowed_file(file.filename):
        return jsonify(responses["FILE_MISSING_REQUEST"]), 400

    try:
        result = service.upload(file)
    except exceptions.CaffException:
        return jsonify(responses["INTERNAL_SERVER_ERROR"]), 400

    if not result:
        return jsonify(responses["GIF_ERROR"]), 400

    return Response(response=json.dumps(result),
                status=200,
                mimetype="application/json")


@caff_bp.route("/delete/<id>", methods=["DELETE"])
@auth_api.login_required
@auth_api.authorize(roles=[Role.ADMIN])
def remove(id):
    try:
        result = service.remove_file(id)
    except exceptions.CaffException:
        return jsonify(responses["INTERNAL_SERVER_ERROR"]), 400

    if result is None:
        return jsonify(responses["FILE_DELETE_ERROR"]), 400

    return Response(response=json.dumps(result),
                        status=200,
                        mimetype="application/json")


def handle_bad_request(e):
    return jsonify(responses_com["INVALID_ENDPOINT"]), 400

