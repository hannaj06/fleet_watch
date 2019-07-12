from lib.authentication import check_auth, authenticate
from blueprints.crm import blueprint as crm_blueprint
from blueprints.time_tracker import blueprint as time_tracker_blueprint
from flask import Flask, request

app = Flask(__name__)


@app.before_request
def check_auth_request():
    auth = request.authorization
    if not auth:
        return authenticate()
    if not check_auth(auth.username, auth.password):
        return authenticate()


if __name__ == '__main__':
    app.run()