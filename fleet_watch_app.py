from flask import Flask, request, jsonify
from flask_jwt_extended import (
  JWTManager, jwt_required, create_access_token,
  get_jwt_identity
)
from flask_cors import CORS
import json

from flask_rest_jsonapi import Api, ResourceDetail, ResourceList, ResourceRelationship
from flask_sqlalchemy import SQLAlchemy
from marshmallow_jsonapi.flask import Schema, Relationship
from marshmallow_jsonapi import fields

from flask_rest_jsonapi.exceptions import ObjectNotFound
from sqlalchemy.orm.exc import NoResultFound

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'super-secret'  # Change this!
app.config['JSONIFY_MIMETYPE'] = 'application/vnd.api+json'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://fleet_watch:knlzlEI90kMc@fleet_watch_db:5432/fleet_watch'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
CORS(app)

db = SQLAlchemy(app)
jwt = JWTManager(app)

class Member(db.Model):
  __tablename__ = 'members'
  member_id = db.Column(db.Integer, primary_key=True)
  first_name = db.Column(db.String)
  last_name = db.Column(db.String)
  email = db.Column(db.String)
  trips = db.relationship('Trip', backref='member')

class Trip(db.Model):
  __tablename__ = 'trips'
  trip_id = db.Column(db.Integer, primary_key=True)
  launch = db.Column(db.String)
  land = db.Column(db.String)
  meters = db.Column(db.Integer)
  member_id = db.Column(db.Integer, db.ForeignKey('members.member_id'))
  boat_id = db.Column(db.Integer, db.ForeignKey('boats.boat_id'))

class Boat(db.Model):
  __tablename__ = 'boats'
  boat_id = db.Column(db.Integer, primary_key=True)
  boat_name = db.Column(db.String)
  trips = db.relationship('Trip', backref='boat')

class MemberSchema(Schema):
  class Meta:
    type_ = 'member'
    self_view = 'member_detail'
    self_view_kwargs = {'id': '<id>'}
    self_view_many = 'member_list'
  
  id = fields.Integer(as_string=True, dump_only=True, attribute='member_id')
  first_name = fields.Str(required=True)
  last_name = fields.Str(required=True)
  email = fields.Str(required=True)
  trips = Relationship(self_view='member_trips',
                       self_view_kwargs={'id': '<member_id>'},
                       related_view='trip_list',
                       related_view_kwargs={'member_id': '<member_id>'},
                       many=True,
                       schema='TripSchema',
                       type_='trip',
                       id_field='trip_id')

class TripSchema(Schema):
  class Meta:
    type_ = 'trip'
    self_view = 'trip_detail'
    self_view_kwargs = {'id': '<id>'}
    self_view_many = 'trip_list'
  
  id = fields.Integer(as_string=True, dump_only=True, attribute='trip_id')
  launch = fields.Str(required=True)
  land = fields.Str(required=True)
  meters = fields.Integer(required=True)
  member = Relationship(attribute='member',
                       self_view='trip_member',
                       self_view_kwargs={'id': '<trip_id>'},
                       related_view='member_detail',
                       related_view_kwargs={'trip_id': '<trip_id>'},
                       schema='MemberSchema',
                       type_='member')
  boat = Relationship(attribute='boat',
                       self_view='trip_boat',
                       self_view_kwargs={'id': '<trip_id>'},
                       related_view='boat_detail',
                       related_view_kwargs={'trip_id': '<trip_id>'},
                       schema='BoatSchema',
                       type_='boat')

class BoatSchema(Schema):
  class Meta:
    type_ = 'boat'
    self_view = 'boat_detail'
    self_view_kwargs = {'id': '<id>'}
    self_view_many = 'boat_list'
  
  id = fields.Integer(as_string=True, dump_only=True, attribute='boat_id')
  boat_name = fields.Str(required=True)
  trips = Relationship(self_view='boat_trips',
                       self_view_kwargs={'id': '<boat_id>'},
                       related_view='trip_list',
                       related_view_kwargs={'boat_id': '<boat_id>'},
                       many=True,
                       schema='TripSchema',
                       type_='trip',
                       id_field='trip_id')

class MemberList(ResourceList):
  schema = MemberSchema
  data_layer = {'session': db.session, 'model': Member}

class MemberDetail(ResourceDetail):
  def before_get_object(self, view_kwargs):
    if view_kwargs.get('trip_id') is not None:
        try:
            trip = self.session.query(Trip).filter_by(trip_id=view_kwargs['trip_id']).one()
        except NoResultFound:
            raise ObjectNotFound({'parameter': 'trip_id'},
                                  "Trip: {} not found".format(view_kwargs['trip_id']))
        else:
            if trip.member_id is not None:
                view_kwargs['id'] = trip.member_id
            else:
                view_kwargs['id'] = None

  schema = MemberSchema
  data_layer = {'session': db.session, 'model': Member, 'methods': {'before_get_object': before_get_object}}

class MemberRelationship(ResourceRelationship):
  schema = MemberSchema
  data_layer = {'session': db.session, 'model': Member}

class TripList(ResourceList):
  def query(self, view_kwargs):
    query_ = self.session.query(Trip)
    if view_kwargs.get('member_id') is not None:
      try:
        self.session.query(Member).filter_by(member_id=view_kwargs['member_id']).one()
      except NoResultFound:
        raise ObjectNotFound({'parameter': 'member_id'}, "Member: {} not found".format(view_kwargs['member_id']))
      else:
        query_ = query_.join(Member).filter(Member.member_id == view_kwargs['member_id'])
    if view_kwargs.get('boat_id') is not None:
      try:
        self.session.query(Boat).filter_by(boat_id=view_kwargs['boat_id']).one()
      except NoResultFound:
        raise ObjectNotFound({'parameter': 'boat_id'}, "Boat: {} not found".format(view_kwargs['boat_id']))
      else:
        query_ = query_.join(Boat).filter(Boat.boat_id == view_kwargs['boat_id'])
    return query_

  schema = TripSchema
  data_layer = {'session': db.session, 'model': Trip, 'methods': {'query': query}}

class TripDetail(ResourceDetail):
  schema = TripSchema
  data_layer = {'session': db.session, 'model': Trip}

class TripRelationship(ResourceRelationship):
  schema = TripSchema
  data_layer = {'session': db.session, 'model': Trip}

class BoatList(ResourceList):
  schema = BoatSchema
  data_layer = {'session': db.session, 'model': Boat}

class BoatDetail(ResourceDetail):
  def before_get_object(self, view_kwargs):
    if view_kwargs.get('trip_id') is not None:
        try:
            trip = self.session.query(Trip).filter_by(trip_id=view_kwargs['trip_id']).one()
        except NoResultFound:
            raise ObjectNotFound({'parameter': 'trip_id'},
                                  "Trip: {} not found".format(view_kwargs['trip_id']))
        else:
            if trip.boat_id is not None:
                view_kwargs['id'] = trip.boat_id
            else:
                view_kwargs['id'] = None

  schema = BoatSchema
  data_layer = {'session': db.session, 'model': Boat, 'methods': {'before_get_object': before_get_object}}

class BoatRelationship(ResourceRelationship):
  schema = BoatSchema
  data_layer = {'session': db.session, 'model': Boat}

@app.route('/')
def hello_world():
    var = {"api_version": "1", "key": "pair"}
    return json.dumps(var)

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

    email = request.json.get('email', None)
    password = request.json.get('password', None)
    if not email:
        return jsonify({"msg": "Missing email parameter"}), 400
    if not password:
        return jsonify({"msg": "Missing password parameter"}), 400

    if email == 'invalid' or password == 'invalid':
        return jsonify({"msg": "Bad email or password"}), 401

    # Identity can be any data that is json serializable
    access_token = create_access_token(identity=email)
    return jsonify(token=access_token), 200

api = Api(app)
api.route(MemberList, 'member_list', '/api/members')
api.route(MemberDetail, 'member_detail', '/api/members/<int:id>', '/api/trips/<int:trip_id>/member')
api.route(MemberRelationship, 'member_trips', '/api/members/<int:id>/relationships/trips')

api.route(TripList, 'trip_list', '/api/trips', '/api/members/<int:member_id>/trips', '/api/boats/<int:boat_id>/trips')
api.route(TripDetail, 'trip_detail', '/api/trips/<int:id>')
api.route(TripRelationship, 'trip_boat', '/api/trips/<int:id>/relationships/boat')
api.route(TripRelationship, 'trip_member', '/api/trips/<int:id>/relationships/member')

api.route(BoatList, 'boat_list', '/api/boats')
api.route(BoatDetail, 'boat_detail', '/api/boats/<int:id>', '/api/trips/<int:trip_id>/boat')
api.route(BoatRelationship, 'boat_trips', '/api/boats/<int:id>/relationships/trips')

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=5000)