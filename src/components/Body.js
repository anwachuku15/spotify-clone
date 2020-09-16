import React from "react";
import "../css/Body.css";
import Header from "./Header";

import { useStateValue } from "../StateProvider";

const Body = () => {
  const [state] = useStateValue();

  const selectedPlaylist = state.playlists.items
    ? state.playlists.items.find(
        (playlist) => playlist.id === state.selectedPlaylistId
      )
    : null;

  return (
    <div className="body">
      {/* <Header /> */}

      {selectedPlaylist ? (
        <div className="playlistInfoContainer">
          {selectedPlaylist.images.length ? (
            <img
              src={selectedPlaylist.images[0].url}
              alt=""
              className="playlist_img"
            />
          ) : null}
          <div className="playlistInfo">
            {selectedPlaylist && <strong className="type">PLAYLIST</strong>}
            <h2>{selectedPlaylist.name}</h2>
            {selectedPlaylist.description && (
              <p className="description">{selectedPlaylist.description}</p>
            )}
            <p className="owner">{selectedPlaylist.owner.display_name}</p>
          </div>
        </div>
      ) : (
        <h1>Welcome To Spotify</h1>
      )}
    </div>
  );
};

export default Body;
