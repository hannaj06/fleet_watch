from flask import Flask, request
import json

app = Flask(__name__)


@app.route('/')
def hello_world():
    var = {"api_version": "1", "key": "pair"}
    return 'Hello world'


@app.route('/login')
def login():
    var = {"api_version": "1", "key": "pair"}
    return json.dumps(var)



if __name__ == '__main__':
    app.run(host='127.0.0.1', debug=True, port=5000)