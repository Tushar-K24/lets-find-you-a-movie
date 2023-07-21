from flask import Flask
from flask_cors import CORS
from src.api.apiV1 import apiV1

app = Flask(__name__)
app.register_blueprint(apiV1)

CORS(app)


if __name__ == "__main__":
    app.run(host="0.0.0.0")