from flask import Flask, request, jsonify
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

# Setup the Flask-JWT-Extended extension
app.config['JWT_SECRET_KEY'] = 'super-secret'  # Change this!
jwt = JWTManager(app)


@app.route('/')
def hello_world():
    var = {"api_version": "1", "key": "pair"}
    return 'Hello world'


@app.route('/api/auth/login', methods=['POST'])
def login():

    print(request)

    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    email = request.json.get('email', None)
    password = request.json.get('password', None)
    if not email:
        return jsonify({"msg": "Missing email parameter"}), 400
    if not password:
        return jsonify({"msg": "Missing password parameter"}), 400

    if email != 'test' or password != 'test':
        return jsonify({"msg": "Bad email or password"}), 401

    # Identity can be any data that is json serializable
    access_token = create_access_token(identity=email)
    return jsonify(token=access_token), 200


@app.route('/api/members/me')
def get_me():
    current_user = get_jwt_identity()

    return jsonify(logged_in_as=current_user), 200

@app.route('/api/members')
def members():
    current_user = get_jwt_identity()

    return jsonify(logged_in_as=current_user), 200

if __name__ == '__main__':
    app.run(host='127.0.0.1', debug=True, port=5000)