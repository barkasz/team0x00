import json
from bson import ObjectId
from bson import datetime
from pymongo.results import UpdateResult


class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        if isinstance(o, (datetime.date, datetime.datetime)):
            return str(o)
        return json.JSONEncoder.default(self, o)
