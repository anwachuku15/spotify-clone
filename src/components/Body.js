import React, { useEffect, useState } from "react";
import "../css/Body.css";
// import Header from "./Header";
import SongRow from "./SongRow";
import { useStateValue } from "../StateProvider";
import { Favorite, MoreHoriz, PlayCircleFilled } from "@material-ui/icons";
import * as Vibrant from "node-vibrant";

const Body = () => {
  const [state] = useStateValue();

  const playlist = {
    info: state.playlistInfo,
    tracks: state.playlistTracks,
  };

  const [palette, setPalette] = useState({});

  useEffect(() => {
    if (state.playlistInfo) {
      Vibrant.from(state.playlistInfo.image)
        .getPalette()
        .then((palette) => {
          setPalette({
            vibrant: palette.Vibrant.hex,
            darkVibrant: palette.DarkVibrant.hex,
            darkMuted: palette.DarkMuted.hex,
            lightVibrant: palette.LightVibrant.hex,
          });
        })
        .then(() => {
          console.log(palette);
        })
        .catch((err) => console.log(err));
    }
  }, [state]);

  return (
    <div className="body">
      {/* <Header /> */}

      {state.playlistInfo ? (
        <div>
          <div
            className="playlistInfoContainer"
            style={{
              background: `linear-gradient(${palette.vibrant}, rgb(34, 34, 34))`,
            }}
          >
            {playlist.info.image ? (
              <img src={playlist.info.image} alt="" className="playlist_img" />
            ) : null}
            <div className="playlistInfo">
              {playlist && <strong className="type">PLAYLIST</strong>}
              <h2>{playlist.info.name}</h2>
              {playlist.info.description && (
                <p className="description">{playlist.info.description}</p>
              )}
              <span>
                <p className="owner">{playlist.info.owner} </p>
                <p className="stats">
                  {" "}
                  · {playlist.info.followers} likes · {playlist.info.duration}
                </p>
              </span>
            </div>
          </div>

          <div className="playlist__icons">
            <PlayCircleFilled fontSize="large" className="play" />
            <Favorite fontSize="large" className="favorite" />
            <MoreHoriz fontSize="large" className="more" />
          </div>

          <div className="playlist__tracks">
            {playlist?.tracks.map((track) => (
              <SongRow track={track} />
            ))}
          </div>
        </div>
      ) : (
        <h1>Welcome To SpotifyClone</h1>
      )}
    </div>
  );
};

export default Body;
