from flask import current_app as app
from flask import Blueprint
from flask import request
from flask import jsonify
from flask import Response
from flask import session
import json


from responses import get_response_codes
from user import service
from user import exceptions
from auth import internal_api as auth_api
from user.roles import Role


user_bp = Blueprint("user_bp", __name__)
responses = get_response_codes("user")


@user_bp.route("/user/users", methods=["GET"])
@auth_api.login_required
@auth_api.authorize(roles=[Role.ADMIN])
def get_users():
    try:
        users = service.get_users()
    except exceptions.UserException:
        return jsonify(responses["INTERNAL_SERVER_ERROR"]), 400

    return Response(response=json.dumps(users),
                    status=200,
                    mimetype='application/json')


@user_bp.route("/user/<user_id>/password", methods=["PUT"])
@auth_api.login_required
@auth_api.authorize(roles=[Role.ADMIN])
def change_password(user_id):
    if request.json is None:
        return jsonify(responses["INFORMATION_MISSING"]), 400

    app.logger.debug(f"Admin user {auth_api.get_username()} changing password for user {user_id}")

    try:
        new_password = request.json["password"]
        service.change_password(user_id=user_id, new_password=new_password)
    except exceptions.UserNotExistsException:
        app.logger.error(f"Admin user {auth_api.get_username()} password change request failed for user {user_id}, because user does not exists!")
        return jsonify(responses["USER_NOT_EXISTS"]), 400
    except exceptions.PasswordChangeException:
        app.logger.error(f"Admin user {auth_api.get_username()} password change request failed for user {user_id}")
        return jsonify(responses["PASSWORD_CHANGE_FAILED"]), 400
    except exceptions.UserException:
        app.logger.error(f"Admin user {auth_api.get_username()} password change request failed for user {user_id}")
        return jsonify(responses["INTERNAL_SERVER_ERROR"]), 400

    app.logger.debug(f"Admin user {auth_api.get_username()} successfully changed password for user {user_id}")

    return jsonify(responses["PASSWORD_SUCCESSFULLY_CHANGED"]), 200


@user_bp.route("/user/<user_id>/role/admin", methods=["PUT"])
@auth_api.login_required
@auth_api.authorize(roles=[Role.ADMIN])
def grant_admin_permission(user_id):
    admin_username = auth_api.get_username()
    app.logger.debug(f"Admin user {auth_api.get_username()} grant permission request for user {user_id}")
    try:
        service.grant_admin_permission(user_id)
    except exceptions.UserNotExistsException:
        app.logger.error(f"Admin user {auth_api.get_username()} grant permission request failed for user {user_id}, because user does not exists!")
        return jsonify(responses["USER_NOT_EXISTS"]), 400
    except exceptions.UserException:
        app.logger.error(f"Admin user {auth_api.get_username()} grant permission request failed for user {user_id}!")
        return jsonify(responses["PERMISSION_GRANT_FAILED"]), 400

    app.logger.debug(f"Admin user {auth_api.get_username()} grant permission request was successfull for user {user_id}!")

    return jsonify(responses["PERMISSION_GRANTED"]), 200


@user_bp.route("/user/<user_id>", methods=["DELETE"])
@auth_api.login_required
@auth_api.authorize(roles=[Role.ADMIN])
def delete_user(user_id):
    if not user_id:
       return jsonify(responses["INFORMATION_MISSING"]), 400

    app.logger.debug(f"Admin user {auth_api.get_username()} delete user request for user {user_id}.")

    try:
        service.delete_user(user_id=user_id)
    except exceptions.UserNotExistsException:
        app.logger.error(f"Admin user {auth_api.get_username()} delete user request failed for user {user_id}, because user does not exists!")
        return jsonify(responses["USER_NOT_EXISTS"]), 400
    except exceptions.DeleteUserException:
        app.logger.error(f"Admin user {auth_api.get_username()} delete user request failed for user {user_id}!")
        return jsonify(responses["USER_DELETION_FAILED"]), 400
    except exceptions.UserException:
        app.logger.error(f"Admin user {auth_api.get_username()} delete user request failed for user {user_id}!")
        return jsonify(responses["INTERNAL_SERVER_ERROR"]), 400

    app.logger.debug(f"Admin user {auth_api.get_username()} delete user request was successfull for user {user_id}!")

    return jsonify(responses["USER_SUCCESSFULLY_DELETED"]), 200


