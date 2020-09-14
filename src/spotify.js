// Click LOGIN button
// Redirect to Spotify login page
export const authEndpoint = "https://accounts.spotify.com/authorize";

// Redirect homepage after authorization
export const redirectUri = "http://localhost:3000";

export const clientId = "2a5d8260cd934a1b8b9b9d2e4b2e5ed3";

// Permissions
export const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
];

export const getTokenFromRedirectURLResponse = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      // LEARN MORE ABOUT REDUCE FUNCTION
      // #accessToken=myaccesstokenhere&token_type=Bearer&expires_in=3600
      let parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);

      return initial;
    }, {});
};

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;
