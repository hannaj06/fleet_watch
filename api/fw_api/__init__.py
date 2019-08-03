from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'super-secret'  # Change this!
app.config['JSONIFY_MIMETYPE'] = 'application/vnd.api+json'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://fleet_watch:knlzlEI90kMc@fleet_watch_db:5432/fleet_watch'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
CORS(app)

db = SQLAlchemy(app)
jwt = JWTManager(app)