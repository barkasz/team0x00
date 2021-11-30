from auth import userdb
from auth import exceptions


def login(username, password, session):
    if(session.get("logged_in")):
        raise exceptions.AlreadyLoggedInException

    try:
        user = userdb.select_user(username, password)
    except exceptions.InvalidCredentialsException:
        raise

    if not user:
        raise exceptions.InvalidCredentialsException

    session["logged_in"] = True
    session["username"] = username

    return user


def logout(session):
    session.pop("logged_in")


def signup(userdata):
    try:
        user = userdb.select_user_by_username(userdata["username"])
    except exceptions.AuthException:
        raise

    if user:
        raise exceptions.UsernameAlreadyExistsException

    try:
        user = userdb.insert_user(userdata)
    except exceptions.AuthException:
        raise

