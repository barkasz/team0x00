from flask import current_app as app
from flask import Blueprint
from flask import jsonify
from flask import request
from flask import Response
import json


from responses import get_response_codes
from auth import internal_api as auth_api
from auth.roles import Role
from post.json_encoder import JSONEncoder
from post import service
from post import exceptions


post_bp = Blueprint("post_bp", __name__)
responses = get_response_codes("post")


@post_bp.route("/post/all", methods=["GET"])
@auth_api.login_required
def read_posts():
    try:
        post_ids = service.read_post_ids_by_date()
    except exceptions.NoMatchingResultsException:
        return jsonify(responses['NO_MATCHING_RESULTS']), 400

    return Response(response=JSONEncoder().encode(post_ids),
                    status=200,
                    mimetype='application/json')


@post_bp.route("/post", methods=["POST"])
@auth_api.login_required
def create_post():
    if request.json is None:
        return jsonify(responses['INFORMATION_MISSING']), 400

    try:
        post = service.create_post(request.json)
    except exceptions.RequiredFieldMissingException:
        return jsonify(responses['REQUIRED_FIELD_MISSING']), 400
    except exceptions.CreatePostException:
        return jsonify(responses['POST_CREATION_FAILED']), 400
    except exceptions.ReadPostException:
        return jsonify(responses['POST_READING_FAILED']), 400
    except exceptions.NoMatchingResultsException:
        return jsonify(responses['NO_MATCHING_RESULTS']), 400

    return Response(response=JSONEncoder().encode(post),
                    status=200,
                    mimetype='application/json')


@post_bp.route("/post/<post_id>", methods=["DELETE"])
@auth_api.login_required
@auth_api.authorize(role=[Role.ADMIN])
def delete_post(post_id):
    try:
        service.delete_post(post_id)
    except exceptions.DeletePostException:
        return jsonify(responses['POST_DELETION_FAILED']), 400

    return jsonify(responses['POST_SUCCESFULLY_DELETED']), 200


@post_bp.route("/post/<post_id>", methods=["GET"])
@auth_api.login_required
def read_post(post_id):
    try:
        post = service.read_post(post_id)
    except exceptions.RequiredFieldMissingException:
        return jsonify(responses['REQUIRED_FIELD_MISSING']), 400
    except exceptions.ReadPostException:
        return jsonify(responses['POST_READING_FAILED']), 400
    except exceptions.NoMatchingResultsException:
        return jsonify(responses['NO_MATCHING_RESULTS']), 400

    return Response(response=JSONEncoder().encode(post),
                    status=200,
                    mimetype='application/json')


@post_bp.route("/post/<post_id>", methods=["POST"])
@auth_api.login_required
def create_comment(post_id):
    if request.json is None:
        return jsonify(responses['INFORMATION_MISSING']), 400

    try:
        user_name = auth_api.get_username()
        comment = service.create_comment(post_id, request.json, user_name)
    except exceptions.RequiredFieldMissingException:
        return jsonify(responses['REQUIRED_FIELD_MISSING']), 400
    except exceptions.CreateCommentException:
        return jsonify(responses['COMMENT_CREATION_FAILED']), 400
    except exceptions.ReadCommentException:
        return jsonify(responses['COMMENT_READING_FAILED']), 400

    return Response(response=JSONEncoder().encode(comment),
                    status=200,
                    mimetype='application/json')


@post_bp.route("/post/<post_id>/<comment_id>", methods=["DELETE"])
@auth_api.login_required
@auth_api.authorize(role=[Role.ADMIN])
def delete_comment(post_id, comment_id):
    try:
        service.delete_comment(post_id, comment_id)
    except exceptions.DeleteCommentException:
        return jsonify(responses['COMMENT_DELETION_FAILED']), 400

    return jsonify(responses['COMMENT_SUCCESFULLY_DELETED']), 200


@post_bp.route("/post/<post_id>/<comment_id>", methods=["POST"])
@auth_api.login_required
def create_reply(post_id, comment_id):
    if request.json is None:
        return jsonify(responses['INFORMATION_MISSING']), 400

    try:
        user_name = auth_api.get_username()
        reply = service.create_reply(post_id, comment_id, request.json, user_name)
    except exceptions.RequiredFieldMissingException:
        return jsonify(responses['REQUIRED_FIELD_MISSING']), 400
    except exceptions.CreateReplyException:
        return jsonify(responses['REPLY_CREATION_FAILED']), 400
    except exceptions.ReadReplyException:
        return jsonify(responses['REPLY_READING_FAILED']), 400

    return Response(response=JSONEncoder().encode(reply),
                    status=200,
                    mimetype='application/json')


@post_bp.route("/post/<post_id>/<comment_id>/<reply_id>", methods=["DELETE"])
@auth_api.login_required
@auth_api.authorize(role=[Role.ADMIN])
def delete_reply(post_id, comment_id, reply_id):
    try:
        service.delete_reply(post_id, comment_id, reply_id)
    except DeleteReplyException:
        return jsonify(responses['REPLY_DELETION_FAILED']), 400

    return jsonify(responses['REPLY_SUCCESFULLY_DELETED']), 200

