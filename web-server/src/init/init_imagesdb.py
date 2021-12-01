import sqlite3
import os


def init(db_name):
    db = None
    try:
        db = sqlite3.connect(db_name)
        db.execute(("CREATE TABLE images "
                    "(id INTEGER PRIMARY KEY AUTOINCREMENT, "
                    "caff TEXT NOT NULL UNIQUE, "
                    "gif TEXT NOT NULL UNIQUE)"))
    except sqlite3.OperationalError:
        # This exception happens when the table is already created
        pass
    finally:
        if db:
            db.close()


def create_dir_if_not_exists(path_to_dir):
    if not os.path.exists(path_to_dir):
        os.mkdir(path_to_dir)
