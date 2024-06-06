""" Connection with the Spotify API created here """
from os import getenv
from spotipy import Spotify
from spotipy import SpotifyOAuth
import os


def create_connection():
    """
        Creates a connection to the Spotify API using
        the provided client ID and client secret.

        Returns:
            Spotify: A Spotify object representing the connection to the API.
            None: If the client ID or client secret is missing.
    """
    client_id = os.getenv('SPOTIFY_CLIENT_ID')
    client_secret = os.getenv('SPOTIFY_CLIENT_SECRET')
    # scope = 'playlist-modify-public'
    scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private playlist-read-collaborative playlist-read-private'

    if client_id is None or client_secret is None:
        print('client id or client secret missing')

    auth = SpotifyOAuth(client_id=client_id,
                        client_secret=client_secret,
                        scope=scope,
                        redirect_uri="http://localhost:5000/callback")
    # print(auth)
    sp = Spotify(auth_manager=auth)
    # print(sp)
    return sp