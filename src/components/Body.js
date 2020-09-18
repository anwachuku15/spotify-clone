import React, { useEffect, useState } from "react";
import "../css/Body.css";
import Header from "./Header";
import SongRow from "./SongRow";
import { useStateValue } from "../StateProvider";
import { Favorite, MoreHoriz, PlayCircleFilled } from "@material-ui/icons";
import * as Vibrant from "node-vibrant";
import { spotify } from "../spotify";
import { Tooltip } from "@material-ui/core";

const Body = () => {
  const [state, dispatch] = useStateValue();

  const playlist = {
    info: state.playlistInfo,
    tracks: state.playlistTracks,
  };

  const [palette, setPalette] = useState({});
  const [currentSongTooltip, setCurrentSongTooltip] = useState();

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

  const goToSpotify = () => {
    window.open("https://open.spotify.com/");
  };

  const refreshPage = () => {
    window.location.reload(false);
  };

  const getTrackDuration = (ms) => {
    const min = Math.floor(ms / 60000);
    const sec = ((ms % 60000) / 1000).toFixed(0);
    const duration = min + ":" + (sec < 10 ? "0" : "") + sec;

    return duration;
  };

  const getPlaylistDuration = (ms) => {
    let hr = Math.floor((ms / 3600000) % 24);
    let min = Math.floor((ms / 60000) % 60);

    let duration;
    if (hr < 1) {
      duration = min + " min";
    } else {
      duration = hr + " hr " + min + " min";
    }

    return duration;
  };
  const playlistTooltip = (track) => {
    const thisPlaylist = state.playlists.items.find(
      (item) => item.uri === track.context_uri
    );
    setCurrentSongTooltip(`Playing from ${thisPlaylist.name}`);
  };

  const playlistButton = (track) => {
    const thisPlaylist = state.playlists.items.find(
      (item) => item.uri === track.context_uri
    );
    const id = thisPlaylist.id;
    let playlistTracks = [];
    let playlistInfo;
    let playlistDuration = 0;
    let playlistLength = -1;
    spotify
      .getPlaylist(id)
      .then((playlist) => {
        // console.log(playlist);
        playlist.tracks.items.forEach((item) => {
          playlistDuration += item.track.duration_ms;
          playlistLength++;
          playlistTracks.push({
            playlist: playlist.name,
            position: playlistLength,
            context_uri: playlist.uri,
            uri: item.track.uri,
            song: item.track.name,
            artists: item.track.artists,
            album: item.track.album.name,
            cover: item.track.album.images[0].url,
            explicit: item.track.explicit,
            duration: getTrackDuration(item.track.duration_ms),
          });
        });
        playlistInfo = {
          id: playlist.id,
          uri: playlist.uri,
          name: playlist.name,
          owner: playlist.owner.display_name,
          image: playlist.images[0].url,
          description: playlist.description,
          followers: playlist.followers.total
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          duration: getPlaylistDuration(playlistDuration),
        };

        const playlistData = {
          playlistInfo: playlistInfo,
          playlistTracks: playlistTracks,
        };
        return playlistData;
      })
      .then((playlistData) => {
        console.log(playlistData.playlistInfo);
        dispatch({
          type: "SET_PLAYLIST",
          playlistInfo: playlistData.playlistInfo,
          playlistTracks: playlistData.playlistTracks,
        });
      })
      .catch((err) => console.log(err));
  };

  const blameSpotify = () => {
    window.open(
      "https://developer.spotify.com/documentation/web-api/reference/playlists/get-list-users-playlists/"
    );
  };

  return (
    <div
      className="body"
      onScroll={(e) => {
        handleScroll(e);
      }}
      style={{
        background: state.playlistInfo
          ? `linear-gradient(${palette.darkMuted}, rgba(0,0,0,1))`
          : `linear-gradient(rgb(38, 38, 38), rgba(0, 0, 0, 1))`,
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
      {state.track ? (
        !state.playlistInfo && (
          <div className="welcomeMsg">
            <p className="message">
              Choose a song from any of your available playlists!
            </p>
            <p className="blameSpotify">
              (If you have over 50 playlists, you won't be able to see past the
              50th. It's not my fault!{" "}
              <span className="blameSpotifyLink" onClick={blameSpotify}>
                Blame Spotify!
              </span>
              )
            </p>
            <p className="currentlyPlaying">Currently Playing</p>
            {/* <Tooltip title={currentSongTooltip} placement="top-end"> */}
            <img
              src={state.track.cover}
              alt=""
              onClick={() => playlistButton(state.track)}
              onMouseOver={() => playlistTooltip(state.track)}
            />
            {/* </Tooltip> */}
            <div
              className="currentSong"
              onClick={() => playlistButton(state.track)}
            >
              <p>{state.track.song}</p>
              <p className="artistName">
                {state.track.artists.map((artist) => artist.name).join(", ")}
              </p>
            </div>
          </div>
        )
      ) : (
        <div className="errorContainer">
          <h1 className="errorWelcome">Uh oh!</h1>
          <h2 className="error">No available devices!</h2>
          <div className="errMsgContainer">
            <p className="errMessage">
              Make sure your{" "}
              <strong className="premium" onClick={goToSpotify}>
                Spotify Premium
              </strong>{" "}
              is already playing on any of your devices, then click{" "}
              <strong onClick={refreshPage} className="refresh">
                refresh!
              </strong>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Body;
