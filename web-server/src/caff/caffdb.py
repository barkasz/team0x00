import sqlite3
from contextlib import contextmanager
from collections import namedtuple
from caff import exceptions

imagesdb_name = "images.db"

Connection = namedtuple("Connection", "db, cursor")


def select_image(id, type: str = "gif") -> str:
    """return image name on success, None otherwise"""
    select_image_query = ("SELECT * FROM images WHERE id = ?")
    try:
        with connect_to_db() as connection:
            connection.cursor.execute(select_image_query, (id,))
            image_names = connection.cursor.fetchone()
    except sqlite3.Error:
        raise exceptions.FileIdMissingException
    if image_names:
        image_names = dict(image_names)
        if type == "caff":
            image_names.pop("gif")
            return image_names["caff"]
        elif type == "gif":
            image_names.pop("caff")
            return image_names["gif"]
        else:
            raise exceptions.NoImageTypeException
    else:
        return None


def delete_image(id):
    """return file names,  (caff, gif) tuple on success, None otherwise"""
    filename_caff = select_image(id, "caff")
    filename_gif = select_image(id, "gif")
    if filename_gif is None or filename_caff is None:
        # this id is not in the database...
        return None
    delete_image_query = ("DELETE FROM images WHERE id = ?")
    try:
        with connect_to_db() as connection:
            connection.cursor.execute(delete_image_query, (id,))
    except sqlite3.Error:
        raise exceptions.DeleteIDExxeption

    return filename_caff, filename_gif


def insert_images(caff: str, gif: str):
    """return id on success"""
    insert_image_query = ("INSERT INTO images (caff, gif) VALUES (?, ?)")
    try:
        with connect_to_db() as connection:
            connection.cursor.execute(insert_image_query, (caff, gif))
    except sqlite3.Error:
        raise exceptions.InternalServerException
    return connection.cursor.lastrowid


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
