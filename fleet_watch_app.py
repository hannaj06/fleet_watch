from flask import Flask, request, jsonify
from flask_jwt_extended import (
  JWTManager, jwt_required, create_access_token,
  get_jwt_identity
)
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import and_
from flask_rest_jsonapi.exceptions import ObjectNotFound
from flask_rest_jsonapi import Api
from sqlalchemy.orm.exc import NoResultFound
from fw_api import models
from fw_api import db, jwt, app
import hashlib
import json


@app.route('/')
def hello_world():
    var = {"api_version": "1", "key": "pair"}
    return json.dumps(var)

@app.route('/api/members/me')
@jwt_required
def get_me():
  current_user = get_jwt_identity()
  member = db.session.query(Member).filter_by(email=current_user).one()
  result = MemberSchema().dump(member)

  return jsonify(result.data), 200

@app.route('/api/auth/login', methods=['POST'])
def login():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    email = request.json.get('email', None)
    password = request.json.get('password', None)
    md = hashlib.md5()
    md.update(password.encode('utf-8'))
    password_hash = md.hexdigest()
    print(password_hash)
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

    print(q.one_or_none())
    # Identity can be any data that is json serializable
    access_token = create_access_token(identity=email)
    return jsonify(token=access_token), 200

api = Api(app)
api.route(models.MemberList, 'member_list', '/api/members')
api.route(models.MemberDetail, 'member_detail', '/api/members/<int:id>', '/api/trips/<int:trip_id>/member')
api.route(models.MemberRelationship, 'member_trips', '/api/members/<int:id>/relationships/trips')

api.route(models.TripList, 'trip_list', '/api/trips', '/api/members/<int:member_id>/trips', '/api/boats/<int:boat_id>/trips')
api.route(models.TripDetail, 'trip_detail', '/api/trips/<int:id>')
api.route(models.TripRelationship, 'trip_boat', '/api/trips/<int:id>/relationships/boat')
api.route(models.TripRelationship, 'trip_member', '/api/trips/<int:id>/relationships/member')

api.route(models.BoatList, 'boat_list', '/api/boats')
api.route(models.BoatDetail, 'boat_detail', '/api/boats/<int:id>', '/api/trips/<int:trip_id>/boat')
api.route(models.BoatRelationship, 'boat_trips', '/api/boats/<int:id>/relationships/trips')

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=5000)