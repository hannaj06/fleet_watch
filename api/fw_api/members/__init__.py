from flask import Blueprint

members = Blueprint('members', __name__, url_prefix='/api')

from . import views