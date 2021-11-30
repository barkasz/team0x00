from auth import userdb
from auth import exceptions


def login(username, password):
    return userdb.select_user(username, password)


def logout():
    return {
        "result": "logged out successfully!"
    }


def signup(signup_form):
    signup_data = {
        "username": str(signup_form['username']),
        "password": str(signup_form['password'])
    }

    try:
        user = userdb.select_user_by_username(signup_data["username"])
    except exceptions.InternalServerException:
        raise

    try:
        if not user:
            userdb.insert_user(signup_data)
        else:
            return None
    except exceptions.InternalServerException:
        raise

    try:
        user = userdb.select_user_by_username(signup_data["username"])
    except exceptions.AuthException:
        raise

    return user

