from datetime import datetime


from post import postdb
from post import exceptions
from auth import internal_api as auth_api


def read_post_ids_by_date():
    return postdb.read_post_ids_by_date()


def create_post(raw_post):
    username = auth_api.get_username()
    raw_post = populate_post(raw_post, username)
    post_id = postdb.create_post(raw_post)
    post = postdb.read_post(post_id)

    return post


def read_post(post_id):
    return postdb.read_post(post_id)


def delete_post(post_id):
    postdb.delete_post(post_id)


def create_comment(post_id, raw_comment, username):
    username = auth_api.get_username()

    raw_comment = populate_comment(raw_comment, username)
    comment_id = postdb.create_comment(post_id, raw_comment)
    comment = postdb.read_comment(post_id, comment_id)

    return comment


def delete_comment(post_id, comment_id):
    postdb.delete_comment(post_id, comment_id)


def create_reply(post_id, comment_id, raw_reply, username):
    username = auth_api.get_username()

    raw_reply = populate_reply(raw_reply, username)
    reply_id = postdb.create_reply(post_id, comment_id, raw_reply)
    reply = postdb.read_reply(post_id, comment_id, reply_id)

    return reply


def delete_reply(post_id, comment_id, reply_id):
    postdb.delete_reply(post_id, comment_id, reply_id)


def populate_post(post, author):
    post["date"] = datetime.now()
    post["comments"] = []
    post["author"] = author
    return post


def populate_comment(comment, author):
    comment["_id"] = postdb.new_object_id()
    comment["date"] = datetime.now()
    comment["replies"] = []
    comment["author"] = author
    return comment


def populate_reply(reply, author):
    reply["_id"] = postdb.new_object_id()
    reply["date"] = datetime.now()
    reply["author"] = author
    return reply

