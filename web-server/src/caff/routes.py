import os

import werkzeug
from flask import Blueprint
from flask import request
from flask import jsonify
from flask import Response
from flask import send_from_directory
from flask import abort
import json

from collections import namedtuple
from flask import Flask, flash, redirect, url_for
from werkzeug.utils import secure_filename

from caff import service
from responses import get_response_codes
import app

caff_bp = Blueprint("caff_bp", __name__)
responses = get_response_codes("caff")
responses_com = get_response_codes("common")

Connection = namedtuple("Connection", "db, cursor")
ALLOWED_EXTENSIONS = {'caff'}

ALLOWED_FILE = {'caff', 'gif'}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@caff_bp.route("/download/<file_type>/<file_id>", methods=["GET"])
def download_file(file_type, file_id):
    if file_type in ALLOWED_FILE:
        filename = service.download_file(file_id, file_type)
        if filename is not None:
            if filename in os.listdir(app.app.config['UPLOAD_FOLDER']):
                #safely send the file
                resp = send_from_directory(app.app.config['UPLOAD_FOLDER'], filename)
                if resp.status_code != 200:
                    return jsonify(responses["FILE_MISSING"]), 400
                return resp
            else:
                return jsonify(responses["FILE_MISSING"]), 400
        else:
            return jsonify(responses["FILE_MISSING"]), 400
    else:
        return jsonify(responses_com["INVALID_ENDPOINT"]), 400



@caff_bp.route("/upload", methods=["POST"])
def upload():
    if 'file' not in request.files:
        return jsonify(responses["FILE_MISSING_REQUEST"]), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify(responses["FILE_MISSING_REQUEST"]), 400
    if file and allowed_file(file.filename):
        result = service.upload(file)
        if result is not None:
            return Response(response=json.dumps(result),
                        status=200,
                        mimetype="application/json")
        else:
            return jsonify(responses["GIF_ERROR"]), 400

@caff_bp.route("/delete/<id>", methods=["DELETE"])
def remove(id):
    result = service.remove_file(id)
    if result is None:
        return jsonify(responses["FILE_DELETE_ERROR"]), 400
    return Response(response=json.dumps(result),
                        status=200,
                        mimetype="application/json")




def handle_bad_request(e):
    return jsonify(responses_com["INVALID_ENDPOINT"]), 400
