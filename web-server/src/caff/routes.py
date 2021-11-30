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
responses = get_response_codes("caff_bp")

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
            return send_from_directory(app.app.config['UPLOAD_FOLDER'], filename)
        else:
            abort(400)
    else:
        abort(400)




@caff_bp.route("/upload", methods=["POST"])
def upload():
    if 'file' not in request.files:
        return jsonify(["FILE_MISSING"]), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify(["FILE_MISSING"]), 400
    if file and allowed_file(file.filename):
        result = service.upload(file)
        if result is not None:
            return Response(response=json.dumps(result),
                        status=200,
                        mimetype="application/json")
        else:
            return abort(400)
