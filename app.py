from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # Apply CORS to the Flask app

# Set up the SQLite database
basedir = os.path.abspath(os.path.dirname(__file__))
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + os.path.join(
    basedir, "bookings.db"
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)


# Define the Booking model
class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    month = db.Column(db.String(20), nullable=False)
    day = db.Column(db.Integer, nullable=False)
    time = db.Column(db.String(20), nullable=False)


# Create the database and tables
with app.app_context():
    db.create_all()


@app.route("/book", methods=["POST"])
def book_hotel():
    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    month = data.get("month")
    day = data.get("day")
    time = data.get("time")

    booking = Booking(name=name, email=email, month=month, day=day, time=time)

    db.session.add(booking)
    db.session.commit()

    return (
        jsonify(
            {
                "message": "Booking successful",
                "booking": {
                    "name": booking.name,
                    "email": booking.email,
                    "month": booking.month,
                    "day": booking.day,
                    "time": booking.time,
                },
            }
        ),
        201,
    )


@app.route("/bookings", methods=["GET"])
def get_bookings():
    bookings = Booking.query.all()
    output = []

    for booking in bookings:
        booking_data = {
            "name": booking.name,
            "email": booking.email,
            "month": booking.month,
            "day": booking.day,
            "time": booking.time,
        }
        output.append(booking_data)

    return jsonify({"bookings": output}), 200


if __name__ == "__main__":
    app.run(debug=True)
