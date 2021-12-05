import sqlite3
import bcrypt

from user.roles import Role


def init(db_name, admin_credentials):
    table_exists = False
    db = None
    try:
        db = sqlite3.connect(db_name)
        db.execute(("CREATE TABLE users "
                    "(id INTEGER PRIMARY KEY AUTOINCREMENT, "
                    "username TEXT NOT NULL UNIQUE, "
                    "password TEXT NOT NULL, "
                    "role INTEGER NOT NULL)"))
    except sqlite3.OperationalError:
        # This exception happens when the table is already created
        table_exists = True
    finally:
        if db:
            db.close()

    if table_exists:
        return

    admin = {
        "username": admin_credentials["ADMIN_USERNAME"],
        "password": hash_password(admin_credentials["ADMIN_PASSWORD"]),
        "role": int(Role.ADMIN)
    }
    insert_user(db_name, admin)


def insert_user(db_name, user):
    insert_user_query = ("INSERT INTO users "
                         "(username, password, role) VALUES (?, ?, ?)")

    username = user['username']
    password = user['password']
    role = user['role']

    try:
        db = sqlite3.connect(db_name, detect_types=sqlite3.PARSE_COLNAMES)
        db.row_factory = sqlite3.Row
        cursor = db.cursor()
        cursor.execute(insert_user_query, (username, password, role))
        db.commit()
    except sqlite3.Error:
        raise
    finally:
        cursor.close()
        db.close()


def hash_password(password: str):
    password = password.encode()
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password, salt)

