from app import app
import sqlite3
from contextlib import contextmanager
from collections import namedtuple
import bcrypt

from auth import exceptions


userdb_name = app.config["USER_DB"]


Connection = namedtuple("Connection", "db, cursor")


def insert_user(user):
    insert_user_query = ("INSERT INTO users "
                         "(username, password, role) VALUES (?, ?, ?)")

    username = user['username']
    password = hash_password(user['password'])
    role = user['role']

    try:
        with connect_to_db() as connection:
            connection.cursor.execute(insert_user_query,
                                      (username, password, role))
            connection.db.commit()
    except sqlite3.Error:
        raise exceptions.AuthException


def select_user_by_username(username):
    select_user_query = ("SELECT * FROM users WHERE username=?")

    try:
        with connect_to_db() as connection:
            connection.cursor.execute(select_user_query, (username, ))
            user = connection.cursor.fetchone()
    except sqlite3.Error:
        raise exceptions.AuthException

    user = dict(user) if user else None
    if user is not None:
        user.pop("password")

    return user


def select_user_by_id(user_id):
    select_user_query = ("SELECT * FROM users WHERE id=?")

    try:
        with connect_to_db() as connection:
            connection.cursor.execute(select_user_query, (user_id, ))
            user = connection.cursor.fetchone()
    except sqlite3.Error:
        raise exceptions.AuthException

    user = dict(user) if user else None

    if user is None:
        raise exceptions.UserNotExistsException

    user.pop("password")

    return user


def select_user(username, password_to_be_checked):
    select_user_query = ("SELECT * FROM users WHERE username=?")

    try:
        with connect_to_db() as connection:
            connection.cursor.execute(select_user_query, (username,))
            user = connection.cursor.fetchone()
    except sqlite3.Error:
        raise exceptions.AuthException

    user = dict(user) if user else None

    if user is None:
        raise exceptions.InvalidCredentialsException

    password = user.pop("password")

    if not bcrypt.checkpw(password_to_be_checked.encode(), password):
        raise exceptions.InvalidCredentialsException

    return user


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


def hash_password(password: str):
    password = password.encode()
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password, salt)

