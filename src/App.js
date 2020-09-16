import React, { useEffect } from "react";
import "./App.css";

import Login from "./components/Login";
import Player from "./components/Player";
import { useStateValue } from "./StateProvider";
import { getTokenFromRedirectURLResponse, spotify } from "./spotify";

function App() {
  // const [token, setToken] = useState(null);
  const [state, dispatch] = useStateValue();

  // Run code based on given conditions (dependencies)
  useEffect(() => {
    // keep an eye on window location & remove access token from URL
    const hash = getTokenFromRedirectURLResponse();
    window.location.hash = "";

    // Best practice for avoiding duplicate const names
    const _token = hash.access_token;
    if (_token) {
      // store token in context
      // console.log(_token);
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });

      // pass token to Spotify
      spotify.setAccessToken(_token);

      // get User response then shoot it into the context (data layer)
      spotify
        .getMe()
        .then((user) => {
          dispatch({
            type: "SET_USER",
            user: user,
          });
        })
        .catch((err) => console.log(err));

      spotify
        .getUserPlaylists({ limit: 50 })
        .then((playlists) => {
          dispatch({
            type: "SET_PLAYLISTS",
            playlists: playlists,
          });
        })
        .catch((err) => console.log(err));

      spotify
        .getMyCurrentPlaybackState()
        .then((track) => {
          dispatch({
            type: "SET_CURRENT_PLAYBACK",
            playback: {
              song: track.item.name,
              artists: track.item.artists,
              cover: track.item.album.images[0].url,
              volume: track.device.volume_percent,
              isPlaying: track.is_playing,
              duration: track.item.duration_ms,
              progress: track.progress_ms,
              repeat_state: track.repeat_state,
              shuffle_state: track.shuffle_state,
              uri: track.item.uri,
            },
          });
        })
        .catch((err) => console.log(err));
    }
  }, [dispatch, state]);

  return (
    <div className="app">
      {/* JSX: Javascript inside return */}
      {state.token ? <Player spotify={spotify} /> : <Login />}
    </div>
  );
}

export default App;
