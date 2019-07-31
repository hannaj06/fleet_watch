from flask import request, jsonify
from flask_jwt_extended import create_access_token
from ..auth import auth
from fw_api import db
from fw_api.models import Member
import hashlib


@auth.route('/auth/login', methods=['POST'])
def login():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    email = request.json.get('email', None)
    password = request.json.get('password', None)
    md = hashlib.md5()
    md.update(password.encode('utf-8'))
    password_hash = md.hexdigest()
    if not email:
        return jsonify({"msg": "Missing email parameter"}), 400
    if not password:
        return jsonify({"msg": "Missing password parameter"}), 400

    if email == 'invalid' or password == 'invalid':
        return jsonify({"msg": "Bad email or password"}), 401

    q = db.session.query(
        Member.email,
        Member.password).filter(
                Member.email==email, Member.password==password_hash)

    # Identity can be any data that is json serializable
    access_token = create_access_token(identity=email)
    return jsonify(token=access_token), 200
