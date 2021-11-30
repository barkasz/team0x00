import sqlite3


def init(db_name):
    db = None
    try:
        db = sqlite3.connect(db_name)
        db.execute(("CREATE TABLE users "
                    "(id INTEGER PRIMARY KEY AUTOINCREMENT, "
                    "username TEXT NOT NULL UNIQUE, "
                    "password TEXT NOT NULL)"))
    except sqlite3.OperationalError:
        # This exception happens when the table is already created
        pass
    finally:
        if db:
            db.close()
