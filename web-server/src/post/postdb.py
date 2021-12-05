from app import app
from pymongo import MongoClient
from bson.objectid import ObjectId
from pymongo.errors import PyMongoError
from pymongo.errors import WriteError
from post import exceptions


db_name = app.config["APP_DATABASE"]
collection_name = app.config["POSTS_COLLECTION"]
posts = MongoClient(app.config["MONGODB_URI"])[db_name][collection_name]


def create_post(post):
    try:
        response = posts.insert_one(post)
    except WriteError:
        raise exceptions.RequiredFieldMissingException
    except PyMongoError:
        raise exceptions.CreatePostException

    return response.inserted_id


def read_post(post_id):
    try:
        filter_ = {"_id": ObjectId(post_id)}
        post = posts.find_one(filter_)
    except PyMongoError:
        raise exceptions.ReadPostException

    if not post:
        raise exceptions.NoMatchingResultsException

    return post


def read_post_ids_by_date():
    try:
        post_ids = posts.find().sort("date", -1).distinct('_id')
        post_ids = [post_id for post_id in post_ids]
    except PyMongoError:
        raise exceptions.ReadPostException

    if not post_ids:
        raise exceptions.NoMatchingResultsException

    return post_ids


def read_posts_by_date():
    try:
        posts_ = posts.find().sort("date", -1)
        result = [post for post in posts_]
    except PyMongoError:
        raise exceptions.ReadPostException

    if not result:
        result = {}

    return result


def search_posts_by_title(title):
    try:
        search_param = {'title': {'$regex' : f'.*{title}.*'}}
        posts_ = posts.find(search_param).sort("date", -1)
        result = [post for post in posts_]
    except PyMongoError:
        raise exceptions.ReadPostException

    if not result:
        raise exceptions.NoMatchingResultsException

    return result


def delete_post(post_id):
    try:
        filter_ = {"_id": ObjectId(post_id)}
        result = posts.delete_one(filter_)
    except PyMongoError:
        raise exceptions.DeletePostException

    if result.deleted_count == 0:
        raise exceptions.DeletePostException


def create_comment(post_id, comment):
    try:
        filter_ = {"_id": ObjectId(post_id)}
        update = {'$push': {'comments': comment}}
        posts.update_one(filter_, update)
    except WriteError:
        raise exceptions.RequiredFieldMissingException
    except PyMongoError:
        raise exceptions.CreateCommentException

    return comment["_id"]


def read_comment(post_id, comment_id):
    try:
        filter_ = {
            "_id": ObjectId(post_id),
            "comments._id": ObjectId(comment_id)
            }
        elem_match = {
            "comments": {
                "$elemMatch": {
                    "_id": ObjectId(comment_id)
                }
            }
        }
        comments = posts.find_one(filter_, elem_match)
    except PyMongoError:
        raise exceptions.ReadCommentException

    if comments:
        comment = comments["comments"][0]

    return comment


def delete_comment(post_id, comment_id):
    try:
        filter_ = {"_id": ObjectId(post_id)}
        update = {
            '$pull': {
                'comments': {
                    "_id": ObjectId(comment_id)
                }
            }
        }
        result = posts.find_one_and_update(filter_, update)
    except PyMongoError:
        raise exceptions.DeleteCommentException


def create_reply(post_id, comment_id, reply):
    try:
        filter_ = {
            "_id": ObjectId(post_id),
            "comments._id": ObjectId(comment_id)
        }
        update = {
            '$push': {
                'comments.$.replies': reply
            }
        }
        posts.find_one_and_update(filter_, update)
    except WriteError:
        raise exceptions.RequiredFieldMissingException
    except PyMongoError:
        raise exceptions.CreateReplyException

    return reply["_id"]


def read_reply(post_id, comment_id, reply_id):
    try:
        pipeline = [
            {
                "$unwind": "$comments"
            },
            {
                "$unwind": "$comments.replies"
            },
            {
                "$match": {
                    "_id": ObjectId(post_id),
                    "comments._id": ObjectId(comment_id),
                    "comments.replies._id": ObjectId(reply_id)
                }
            }
        ]

        replies = list(posts.aggregate(pipeline))
    except PyMongoError:
        raise exceptions.ReadReplyException

    if replies:
        reply = replies[0]["comments"]["replies"]

    return reply


def delete_reply(post_id, comment_id, reply_id):
    try:
        filter_ = {
            "_id": ObjectId(post_id),
            "comments._id": ObjectId(comment_id),
            "comments.replies._id": ObjectId(reply_id)
        }
        update = {
            '$pull': {
                'comments.$.replies': {
                    "_id": ObjectId(reply_id)
                }
            }
        }
        posts.find_one_and_update(filter_, update)
    except PyMongoError:
        raise exceptions.DeleteReplyException


def new_object_id():
    return ObjectId()

