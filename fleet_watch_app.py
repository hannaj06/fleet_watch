from flask import Flask, request, jsonify, Blueprint
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
from fw_api.auth import auth
from fw_api.members import members
import json


home = Blueprint('home', __name__,)


print(app)

@home.route('/')
def hello_world():
    var = {"api_version": "1", "key": "pair"}
    return json.dumps(var)

<<<<<<< HEAD
=======
@app.route('/api/sessions/current')
@jwt_required
def get_me():
  current_user = get_jwt_identity()
  member = db.session.query(Member).filter_by(email=current_user).one()
  result = MemberSchema().dump(member)
  session = {
    "data": {
      "id": "current",
      "type": "session",
      "relationships": {
        "member": {
          "data": {"id": member.member_id, "type": "member"}
        },
      },
      "included": [ result.data ]
    }
  }

  return jsonify(session), 200

@app.route('/api/auth/login', methods=['POST'])
def login():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400
>>>>>>> Offline first, fetching session + data

app.register_blueprint(auth)
app.register_blueprint(home)
app.register_blueprint(members)


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