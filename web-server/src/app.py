from flask import Flask
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

# app.config = []

# init

from init import init_authdb, init_imagesdb
from caff import caffdb

init_authdb.init('users.db')
init_imagesdb.init(caffdb.imagesdb_name)

# register routes
UPLOAD_FOLDER = 'media/'

from routes import hello_world_bp
from caff.routes import caff_bp
from auth.routes import auth_bp

app.register_blueprint(hello_world_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(caff_bp)
app.config['MAX_CONTENT_LENGTH'] = 16 * 1000 * 1000
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


