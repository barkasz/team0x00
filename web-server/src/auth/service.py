from auth import userdb
from auth import exceptions


def login(username, password):
    return userdb.select_user(username, password)


def logout():
    return {
        "result": "logged out successfully!"
    }


def signup(userdata):

    try:
        user = userdb.select_user_by_username(userdata["username"])
    except exceptions.InternalServerException:
        raise

    if user:
        raise exceptions.UsernameAlreadyExistsException

    try:
        user = userdb.insert_user(userdata)
    except exceptions.InternalServerException:
        raise

