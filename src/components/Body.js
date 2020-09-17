import React, { useEffect, useState } from "react";
import "../css/Body.css";
import Header from "./Header";
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
        .catch((err) => console.log(err));
    }
  }, [state]);

  let _headerStyle = {
    backgroundColor: "transparent",
  };
  const [headerStyle, setHeaderStyle] = useState({ _headerStyle });

  const handleScroll = (e) => {
    if (e.target.scrollTop <= 299) {
      setHeaderStyle(_headerStyle);
    } else {
      setHeaderStyle({
        backgroundColor: palette.darkMuted,
      });
    }
  };

  return (
    <div
      className="body"
      onScroll={(e) => {
        handleScroll(e);
      }}
      style={{
        background: `linear-gradient(${palette.darkMuted}, rgba(0,0,0,1))`,
      }}
    >
      {/* <Header /> */}

      {state.playlistInfo ? (
        <div>
          <div
            style={{
              background: `linear-gradient(${palette.vibrant}, ${palette.darkMuted})`,
            }}
          >
            <Header headerStyle={headerStyle} />

            <div className="playlistInfoContainer">
              {playlist.info.image ? (
                <img
                  src={playlist.info.image}
                  alt=""
                  className="playlist_img"
                />
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
        <h1 className="welcome">Welcome To SpotifyClone</h1>
      )}
    </div>
  );
};

export default Body;
