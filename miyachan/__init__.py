from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config.from_object('miyachan.config')

db = SQLAlchemy(app)

from miyachan.views import views