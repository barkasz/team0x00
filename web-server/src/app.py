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

# user database ini
app.config["USERDB_INIT"] = config["USERDB_INIT"]

# Session
app.config["SECRET_KEY"] = config["SESSION"]["SECRET_KEY"]
app.config["SESSION_PERMANENT"] = config["SESSION"]["SESSION_PERMANENT"]
app.config["SESSION_FILE_DIR"] = config["SESSION"]["SESSION_FILE_DIR"]
app.config["SESSION_TYPE"] = config["SESSION"]["SESSION_TYPE"]
app.config["SESSION_FILE_THRESHOLD"] = int(config["SESSION"]["SESSION_FILE_THRESHOLD"])
app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(minutes=int(config["SESSION"]["PERMANENT_SESSION_LIFETIME"]))

# MongoDB
app.config["MONGODB_URI"] = config["MONGO"]["MONGODB_URI"]
app.config["APP_DATABASE"] = config["MONGO"]["APP_DATABASE"]
app.config["POSTS_COLLECTION"] = config["MONGO"]["POSTS_COLLECTION"]

# Caff database and file system
app.config["UPLOAD_FOLDER"] = config["CAFF"]["UPLOAD_FOLDER"]
app.config["IMAGES_DB"] = config["CAFF"]["IMAGES_DB"]
app.config["MAX_CONTENT_LENGTH"] = 16 * 1000 * 1000

# Session
session = Session()
session.init_app(app)

# init
from init import init_authdb
from init import init_imagesdb
from caff import caffdb

init_authdb.init(app.config["USER_DB"], app.config["USERDB_INIT"])
init_imagesdb.create_dir_if_not_exists(app.config["UPLOAD_FOLDER"])
init_imagesdb.init(caffdb.imagesdb_name)

# register routes

from caff.routes import caff_bp, handle_bad_request
from auth.routes import auth_bp
from post.routes import post_bp
from user.routes import user_bp

app.register_blueprint(auth_bp)
app.register_blueprint(post_bp)
app.register_blueprint(caff_bp)
app.register_blueprint(user_bp)

app.register_error_handler(404, handle_bad_request)


