""" a script used to get dynamic data from
    Spotify to use in the web app
"""


def get_genres(sp):
    """ used to get all genres from Spotify
        sp: an instance of spotify connection """
    genres = sp.recommendation_genre_seeds()['genres']

    return genres
