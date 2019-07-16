from flask import Flask, request


app = Flask(__name__)


@app.route('/')
def hello_world():
	return 'Hello world'


if __name__ == '__main__':
    app.run(host='127.0.0.1', debug=True, port=5000)