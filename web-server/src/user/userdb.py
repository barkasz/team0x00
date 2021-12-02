
from app import app
import sqlite3
from contextlib import contextmanager
from collections import namedtuple

from user import exceptions


userdb_name = app.config["USER_DB"]


Connection = namedtuple("Connection", "db, cursor")


def select_users():
    select_user_query = ("SELECT * FROM users")

    try:
        with connect_to_db() as connection:
            connection.cursor.execute(select_user_query)
            users = connection.cursor.fetchall()
    except sqlite3.Error:
        raise exceptions.UserException

    if not users:
        return []

    users = [dict(user) for user in users]

    for user in users:
        user.pop("password")

    return users


def select_user_by_id(user_id):
    select_user_query = ("SELECT * FROM users WHERE id=?")

    try:
        with connect_to_db() as connection:
            connection.cursor.execute(select_user_query, (user_id, ))
            user = connection.cursor.fetchone()
    except sqlite3.Error:
        raise exceptions.UserException

    user = dict(user) if user else None

    if user is None:
        raise exceptions.UserNotExistsException

    user.pop("password")

    return user


def delete_user(user_id):
    select_user_query = ("DELETE FROM users WHERE id=?")

    try:
        with connect_to_db() as connection:
            connection.cursor.execute(select_user_query, (user_id,))
            connection.db.commit()
    except sqlite3.Error:
        raise exceptions.DeleteUserException


def update_password(user_id, password):
    update_query = ("UPDATE users SET password=? WHERE id=?")

    try:
        with connect_to_db() as connection:
            connection.cursor.execute(update_query, (password, user_id))
            connection.db.commit()
    except sqlite3.Error:
        raise exceptions.PasswordChangeException


def update_role(user_id, role):
    update_query = ("UPDATE users SET role=? WHERE id=?")

    try:
        with connect_to_db() as connection:
            connection.cursor.execute(update_query, (role, user_id))
            connection.db.commit()
    except sqlite3.Error:
        raise exceptions.UserException


@contextmanager
def connect_to_db():
    try:
        db = sqlite3.connect(userdb_name, detect_types=sqlite3.PARSE_COLNAMES)
        db.row_factory = sqlite3.Row
        cursor = db.cursor()
        yield Connection(db, cursor)
    finally:
        cursor.close()
        db.close()

