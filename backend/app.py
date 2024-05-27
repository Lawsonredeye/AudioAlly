#!/usr/bin/python3
""" The Flask App and routes """

from flask import Flask, render_template, request, jsonify
from api_connection import create_connection
from get_dynamic_data import get_genres

app = Flask(__name__)
app.url_map.strict_slashes = False


sp = create_connection()
@app.route('/')
@app.route('/home', methods=['GET'])
def index():
    """ the main page """
    genres = get_genres(sp)
    return render_template('index.html', genres=genres)


@app.route('/login')
def login():
    """ will be used if we decide to use Auth-flow """
    pass


@app.route('/callback')
def callback():
    """ same as login route """
    pass


@app.route('/create_playlist', methods=['POST'])
def create_playlist():
    genre = request.form.getlist('genre')
    return jsonify(genre)


@app.route('/playlist_created')
def playlist_created():
    """ page to show the playlist link that has been created """
    pass


@app.route('/contact_us')
def contact_us():
    return render_template('contact.html')


@app.route('/about')
def about():
    return render_template('about.html')


if __name__ == "__main__":
    app.run(debug=True, port='5002')
