from user import userdb
from user import exceptions
from user.roles import Role


def get_users():
    users = userdb.select_users()
    for user in users:
        user["admin"] = True if Role(user.pop("role")) is Role.ADMIN else False

    return users

def delete_user(user_id):
    userdb.select_user_by_id(user_id=user_id)
    userdb.delete_user(user_id=user_id)


def change_password(user_id, new_password):
    userdb.select_user_by_id(user_id=user_id)
    userdb.update_password(user_id=user_id, password=new_password)


def grant_admin_permission(user_id):
    userdb.select_user_by_id(user_id)
    userdb.update_role(user_id=user_id, role=int(Role.ADMIN))

