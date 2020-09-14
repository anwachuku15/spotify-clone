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

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;
