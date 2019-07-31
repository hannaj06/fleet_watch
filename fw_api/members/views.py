from flask import request, jsonify
from ..members import members
from flask_jwt_extended import (
  JWTManager, jwt_required, create_access_token,
  get_jwt_identity
)
from fw_api import db


@members.route('/members/me')
@jwt_required
def get_me():
      current_user = get_jwt_identity()
      member = db.session.query(Member).filter_by(email=current_user).one()
      result = MemberSchema().dump(member)

      return jsonify(result.data), 200