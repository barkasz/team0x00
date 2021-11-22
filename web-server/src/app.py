from flask import Flask
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

# app.config = []

from routes import hello_world_bp

app.register_blueprint(hello_world_bp)
