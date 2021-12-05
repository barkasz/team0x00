from auth import userdb
from auth import exceptions
from user.roles import Role


def login(username, password, session):
    user = userdb.select_user(username, password)

    if not user:
        raise exceptions.InvalidCredentialsException

    role = Role(user.pop("role"))
    user["admin"] = role is Role.ADMIN

    session["logged_in"] = True
    session["username"] = username
    session["role"] = role

    return user


def logout(session):
    session.pop("logged_in")


def signup(userdata):
    user = userdb.select_user_by_username(userdata["username"])

    if user:
        raise exceptions.UsernameAlreadyExistsException

    userdata["role"] = int(Role.USER)
    user = userdb.insert_user(userdata)

