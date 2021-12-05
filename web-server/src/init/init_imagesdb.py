import sqlite3


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
