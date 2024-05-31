""" this file contains all operation that are going to be
    used to create and manipulate the playlist
"""


import os


countries = [
    "AF", "AX", "AL", "DZ", "AS", "AD", "AO", "AI", "AQ", "AG", "AR", "AM", "AW", "AU", "AT",
    "AZ", "BS", "BH", "BD", "BB", "BY", "BE", "BZ", "BJ", "BM", "BT", "BO", "BA", "BW", "BV", "BR",
    "IO", "BN", "BG", "BF", "BI", "KH", "CM", "CA", "CV", "KY", "CF", "TD", "CL", "CN", "CX", "CC",
    "CO", "KM", "CG", "CD", "CK", "CR", "CI", "HR", "CU", "CY", "CZ", "DK", "DJ", "DM", "DO", "EC",
    "EG", "SV", "GQ", "ER", "EE", "SZ", "ET", "FK", "FO", "FJ", "FI", "FR", "GF", "PF", "TF", "GA",
    "GM", "GE", "DE", "GH", "GI", "GR", "GL", "GD", "GP", "GU", "GT", "GG", "GN", "GW", "GY", "HT",
    "HM", "VA", "HN", "HK", "HU", "IS", "IN", "ID", "IR", "IQ", "IE", "IM", "IL", "IT", "JM", "JP",
    "JE", "JO", "KZ", "KE", "KI", "KP", "KR", "KW", "KG", "LA", "LV", "LB", "LS", "LR", "LY", "LI",
    "LT", "LU", "MO", "MG", "MW", "MY", "MV", "ML", "MT", "MH", "MQ", "MR", "MU", "YT", "MX", "FM",
    "MD", "MC", "MN", "ME", "MS", "MA", "MZ", "MM", "NA", "NR", "NP", "NL", "AN", "NC", "NZ", "NI",
    "NE", "NG", "NU", "NF", "MP", "MK", "NO", "OM", "PK", "PW", "PS", "PA", "PG", "PY", "PE", "PH",
    "PN", "PL", "PT", "PR", "QA", "RE", "RO", "RU", "RW", "BL", "SH", "KN", "LC", "MF", "PM", "VC",
    "WS", "SM", "ST", "SA", "SN", "RS", "SC", "SL", "SG", "SK", "SI", "SB", "SO", "ZA", "GS", "ES",
    "LK", "SD", "SR", "SJ", "SE", "CH", "SY", "TW", "TJ", "TZ", "TH", "TL", "TG", "TK", "TO", "TT",
    "TN", "TM", "TC", "TV", "TR", "UG", "UA", "AE", "GB", "US", "UM", "UY", "UZ", "VU", "VE", "VN",
    "VG", "VI", "WF", "EH", "YE", "ZM", "ZW", "0"
]

genre_s = ['rock', 'pop', 'hip-hop', 'afrobeat', 'country', 'reggae',
          'k-pop', 'latin', 'workout', 'party', 'sleep', 'travel']


def createPlaylist(sp, playlist_name, genres, artists, country):
    """ used to creaate a playlist with given options
        sp:
            the Spotify api connection.

        playlist_name:
            given playlist name by user.

        genres:
            genres selected by user.(optional)

        artists:
            artist name entered by user.(optional)

        county:
            country of music genres to be included in the playlist.(optional)

        Return:
            the created playlist link

    """

    # user_id = os.getenv('AUDIOALLY_UID')
    user_id = sp.me()['id']
    print(f"Authenticated user ID: {user_id}")
    # user_id = "31k5hqmptx5ff67jew6ttedoqd3u"

    playlist = sp.user_playlist_create(user_id, playlist_name, public=True)

    track_ids = []
    for genre in genres:
        if genre not in genre_s or country not in countries:
            return None
        elif country != "0":
            tracks = sp.search(q='genre:' + genre, type='track',
                               limit=3, market=country)
        else:
            tracks = sp.search(q='genre:' + genre, type='track', limit=3)
        for track in tracks['tracks']['items']:
            track_ids.append(track['id'])

    if artists:
        # for artist in artists:
        if country in countries:
            tracks = sp.search(q='artist:' + artists,
                               type='track', limit=3, market=country)
        else:
            tracks = sp.search(q='artist:' + artists, type='track', limit=3)
        # change artists to artist         !
        for track in tracks['tracks']['items']:
            track_ids.append(track['id'])

    sp.playlist_add_items(playlist_id=playlist['id'], items=sorted(track_ids))

    return playlist['external_urls']['spotify']



# """ this file contains all operations that are going to be
#     used to create and manipulate the playlist
# """
# import os
# from spotipy.exceptions import SpotifyException

# countries = [
#     "AF", "AX", "AL", "DZ", "AS", "AD", "AO", "AI", "AQ", "AG", "AR", "AM", "AW", "AU", "AT",
#     "AZ", "BS", "BH", "BD", "BB", "BY", "BE", "BZ", "BJ", "BM", "BT", "BO", "BA", "BW", "BV", "BR",
#     "IO", "BN", "BG", "BF", "BI", "KH", "CM", "CA", "CV", "KY", "CF", "TD", "CL", "CN", "CX", "CC",
#     "CO", "KM", "CG", "CD", "CK", "CR", "CI", "HR", "CU", "CY", "CZ", "DK", "DJ", "DM", "DO", "EC",
#     "EG", "SV", "GQ", "ER", "EE", "SZ", "ET", "FK", "FO", "FJ", "FI", "FR", "GF", "PF", "TF", "GA",
#     "GM", "GE", "DE", "GH", "GI", "GR", "GL", "GD", "GP", "GU", "GT", "GG", "GN", "GW", "GY", "HT",
#     "HM", "VA", "HN", "HK", "HU", "IS", "IN", "ID", "IR", "IQ", "IE", "IM", "IL", "IT", "JM", "JP",
#     "JE", "JO", "KZ", "KE", "KI", "KP", "KR", "KW", "KG", "LA", "LV", "LB", "LS", "LR", "LY", "LI",
#     "LT", "LU", "MO", "MG", "MW", "MY", "MV", "ML", "MT", "MH", "MQ", "MR", "MU", "YT", "MX", "FM",
#     "MD", "MC", "MN", "ME", "MS", "MA", "MZ", "MM", "NA", "NR", "NP", "NL", "AN", "NC", "NZ", "NI",
#     "NE", "NG", "NU", "NF", "MP", "MK", "NO", "OM", "PK", "PW", "PS", "PA", "PG", "PY", "PE", "PH",
#     "PN", "PL", "PT", "PR", "QA", "RE", "RO", "RU", "RW", "BL", "SH", "KN", "LC", "MF", "PM", "VC",
#     "WS", "SM", "ST", "SA", "SN", "RS", "SC", "SL", "SG", "SK", "SI", "SB", "SO", "ZA", "GS", "ES",
#     "LK", "SD", "SR", "SJ", "SE", "CH", "SY", "TW", "TJ", "TZ", "TH", "TL", "TG", "TK", "TO", "TT",
#     "TN", "TM", "TC", "TV", "TR", "UG", "UA", "AE", "GB", "US", "UM", "UY", "UZ", "VU", "VE", "VN",
#     "VG", "VI", "WF", "EH", "YE", "ZM", "ZW", "0"
# ]

# genre_s = ['rock', 'pop', 'hip-hop', 'afrobeat', 'country', 'reggae',
#            'k-pop', 'latin', 'workout', 'party', 'sleep', 'travel']

# def createPlaylist(sp, playlist_name, genres, artists, country):
#     """
#     Used to create a playlist with given options.
#     sp: The Spotify API connection.
#     playlist_name: Given playlist name by user.
#     genres: Genres selected by user (optional).
#     artists: Artist names entered by user (optional).
#     country: Country of music genres to be included in the playlist (optional).

#     Return:
#         The created playlist link.
#     """

#     # Get the authenticated user's ID
#     user_id = sp.me()['id']
#     print(f"Authenticated user ID: {user_id}")

#     # Create the playlist
#     playlist = sp.user_playlist_create(user_id, playlist_name, public=True)

#     track_ids = set() # Use a set to store unique track IDs

#     # # Fetch tracks based on genres
#     # for genre in genres:
#     #     if genre not in genre_s:
#     #         print(f"Invalid genre: {genre}")
#     #         continue  # Skip invalid genre and continue to the next
#     #     if country != "0":
#     #         tracks = sp.search(q=f'genre:{genre}', type='track', limit=3, market=country)
#     #     else:
#     #         tracks = sp.search(q=f'genre:{genre}', type='track', limit=3)
#     #     for track in tracks['tracks']['items']:
#     #         track_ids.add(track['id']) # Add track ID to the set

#     # # Fetch tracks based on artists
#     # for artist in artists:
#     #     if country in countries:
#     #         tracks = sp.search(q=f'artist:{artist}', type='track', limit=3, market=country)
#     #     else:
#     #         tracks = sp.search(q=f'artist:{artist}', type='track', limit=3)
#     #     for track in tracks['tracks']['items']:
#     #         track_ids.add(track['id']) # Add track ID to the set

#     # 
    
#     # Fetch recent tracks by favorite artists
#     for artist in artists:
#         if country in countries:
#             tracks = sp.search(q='artist:' + artist, type='track', limit=10, market=country)
#         else:
#             tracks = sp.search(q='artist:' + artist, type='track', limit=10)
        
#         for track in tracks['tracks']['items']:
#             album_genres = track['album'].get('genres', [])
#             if not genres or any(genre in album_genres for genre in genres):
#                 track_ids.add(track['id'])

#     # If not enough tracks from artists, fetch top tracks from genres
#     if len(track_ids) < 30:  # Assuming you want at least 10 tracks
#         for genre in genres:
#             if country != "0":
#                 tracks = sp.search(q='genre:' + genre, type='track', limit=50, market=country)
#             else:
#                 tracks = sp.search(q='genre:' + genre, type='track', limit=50)

#             for track in tracks['tracks']['items']:
#                 track_ids.add(track['id'])
#                 if len(track_ids) >= 30:
#                     break
#             if len(track_ids) >= 30:
#                 break

#     # Function to add tracks to a playlist in batches
#     def add_tracks_in_batches(playlist_id, track_ids, batch_size=100):
#         track_id_list = list(track_ids)
#         for i in range(0, len(track_id_list), batch_size):
#             batch = track_id_list[i:i + batch_size]
#             try:
#                 sp.playlist_add_items(playlist_id, batch)
#             except SpotifyException as e:
#                 print(f"Failed to add batch {i // batch_size + 1}: {e}")

#     # Add tracks to the playlist in batches
#     add_tracks_in_batches(playlist['id'], track_ids)

#     return playlist['external_urls']['spotify']
