import requests
import base64
import os

SPOTIFY_CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
SPOTIFY_CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")

SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token"
SPOTIFY_NEW_RELEASES_URL = "https://api.spotify.com/v1/browse/new-releases"


def get_access_token():
    if not SPOTIFY_CLIENT_ID or not SPOTIFY_CLIENT_SECRET:
        raise Exception("Credenciales de Spotify no configuradas")

    auth_str = f"{SPOTIFY_CLIENT_ID}:{SPOTIFY_CLIENT_SECRET}"
    b64_auth = base64.b64encode(auth_str.encode()).decode()

    headers = {
        "Authorization": f"Basic {b64_auth}",
        "Content-Type": "application/x-www-form-urlencoded"
    }

    data = {"grant_type": "client_credentials"}

    response = requests.post(SPOTIFY_TOKEN_URL, headers=headers, data=data)

    if response.status_code != 200:
        print("ERROR TOKEN SPOTIFY:", response.status_code, response.text)
        raise Exception("Spotify token error")

    return response.json()["access_token"]


def get_new_releases(limit: int = 10):
    token = get_access_token()

    headers = {
        "Authorization": f"Bearer {token}"
    }

    params = {
        "limit": limit,
        "country": "MX"
    }

    response = requests.get(
        SPOTIFY_NEW_RELEASES_URL,
        headers=headers,
        params=params,
        timeout=10
    )

    if response.status_code != 200:
        print("ERROR NEW RELEASES:", response.status_code, response.text)
        raise Exception("Spotify API error")

    data = response.json()

    albums = []
    for album in data["albums"]["items"]:
        albums.append({
            "album_name": album["name"],
            "artist": album["artists"][0]["name"],
            "image": album["images"][0]["url"] if album["images"] else None,
            "release_date": album["release_date"],
            "spotify_url": album["external_urls"]["spotify"]
        })

    return albums
