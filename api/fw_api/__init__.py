from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)

app.config['JWT_SECRET_KEY'] = 'super-secret'  # Change this!
app.config['JWT_COOKIE_SECURE'] = False
app.config['JWT_ACCESS_COOKIE_PATH'] = '/api'
app.config['JWT_REFRESH_COOKIE_PATH'] = '/token/refresh'
app.config['JWT_COOKIE_CRSF_PROTECT'] = True
app.config['JWT_TOKEN_LOCATION'] = ['cookies']

app.config['JSONIFY_MIMETYPE'] = 'application/vnd.api+json'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://fleet_watch:knlzlEI90kMc@fleet_watch_db:5432/fleet_watch'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
CORS(app, supports_credentials=True)

db = SQLAlchemy(app)
jwt = JWTManager(app)