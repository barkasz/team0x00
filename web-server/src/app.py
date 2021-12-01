from flask import Flask
from flask_cors import CORS
from flask_session import Session
import configparser
from datetime import timedelta


app = Flask(__name__)
CORS(app)

# parse config file
config = configparser.ConfigParser()
config.read('/usr/config/config.ini')

# user database
app.config["USER_DB"] = config["USER"]["USER_DB"]

# Session
app.config["SECRET_KEY"] = config["SESSION"]["SECRET_KEY"]
app.config["SESSION_PERMANENT"] = config["SESSION"]["SESSION_PERMANENT"]
app.config["SESSION_TYPE"] = config["SESSION"]["SESSION_TYPE"]
app.config["SESSION_FILE_THRESHOLD"] = int(config["SESSION"]["SESSION_FILE_THRESHOLD"])
app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(minutes=int(config["SESSION"]["PERMANENT_SESSION_LIFETIME"]))

# MongoDB
app.config["MONGODB_URI"] = config["MONGO"]["MONGODB_URI"]
app.config["APP_DATABASE"] = config["MONGO"]["APP_DATABASE"]
app.config["POSTS_COLLECTION"] = config["MONGO"]["POSTS_COLLECTION"]

# Session
session = Session()
session.init_app(app)

# init
from init import init_authdb
from init import init_authdb, init_imagesdb
from caff import caffdb

init_authdb.init('users.db')
init_imagesdb.init(caffdb.imagesdb_name)

# register routes
UPLOAD_FOLDER = 'media/'

from caff.routes import caff_bp, handle_bad_request
from auth.routes import auth_bp
from post.routes import post_bp

app.register_blueprint(auth_bp)
app.register_blueprint(post_bp)
app.register_blueprint(caff_bp)
app.config['MAX_CONTENT_LENGTH'] = 16 * 1000 * 1000
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

app.register_error_handler(404, handle_bad_request)


