import sqlite3
from contextlib import contextmanager
from collections import namedtuple

from caff import exceptions

imagesdb_name = "images.db"

Connection = namedtuple("Connection", "db, cursor")


def select_images(id, type: str = "all"):
    select_user_query = ("SELECT * FROM images WHERE id = ?")

    try:
        with connect_to_db() as connection:
            connection.cursor.execute(select_images, id)
            image = connection.cursor.fetchone()
    except sqlite3.Error:
        raise exceptions.InvalidCredentialsException

    image = dict(image) if image else None

    if type == "caff":
        image.pop("gif")
        return image
    elif type == "gif":
        image.pop("caff")
        return image
    return image


def insert_images(caff, gif):
    insert_image_query = ("INSERT INTO images (caff, gif) VALUES (?, ?)")
    try:
        with connect_to_db() as connection:
            connection.cursor.execute(insert_image_query, (caff, gif))
            connection.db.commit()
    except sqlite3.Error:
        raise exceptions.InternalServerException


@contextmanager
def connect_to_db():
    try:
        db = sqlite3.connect(imagesdb_name, detect_types=sqlite3.PARSE_COLNAMES)
        db.row_factory = sqlite3.Row
        cursor = db.cursor()
        yield Connection(db, cursor)
    finally:
        cursor.close()
        db.close()
