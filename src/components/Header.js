import React, { useEffect, useState } from "react";
import "../css/Header.css";
import SearchIcon from "@material-ui/icons/Search";
import { Avatar, Fab } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import PauseCircleFilled from "@material-ui/icons/PauseCircleFilled";
import PlayCircleFilled from "@material-ui/icons/PlayCircleFilled";
import { useStateValue } from "../StateProvider";
import { spotify } from "../spotify";

const Header = ({ headerStyle, playButton }) => {
  const [state, dispatch] = useStateValue();

  // window.addEventListener("scroll", changeHeader, true);
  const [isPlaylistPlaying, setIsPlaylistPlaying] = useState(true);

  const getTrackDuration = (ms) => {
    const min = Math.floor(ms / 60000);
    const sec = ((ms % 60000) / 1000).toFixed(0);
    const duration = min + ":" + (sec < 10 ? "0" : "") + sec;

    return duration;
  };

  const setIsPlaying = (isPlaying) => {
    dispatch({
      type: "SET_IS_PLAYING",
      isPlaying: isPlaying,
    });
  };

  const setTrack = (track) => {
    if (track) {
      dispatch({
        type: "SET_TRACK",
        track: {
          context_uri: track.context.uri,
          uri: track.item.uri,
          song: track.item.name,
          artists: track.item.artists,
          cover: track.item.album.images[0].url,
          duration: getTrackDuration(track.item.duration_ms),
          // volume: track.device.volume_percent,
        },
      });
    }
  };

  const handlePlayPausePlaylist = () => {
    if (state.playlistInfo.uri !== state.track.context_uri) {
      spotify.play({ context_uri: state.playlistInfo.uri }).then(() => {
        spotify.getMyCurrentPlayingTrack().then((res) => {
          setTrack(res);
          setIsPlaying(true);
        });
      });
    } else {
      if (state.isPlaying) {
        spotify.pause();
        setIsPlaying(false);
      } else {
        spotify.play();
        setIsPlaying(true);
      }
    }
  };

  useEffect(() => {
    if (state.playlistInfo && state.track.context_uri) {
      if (state.playlistInfo.uri === state.track.context_uri) {
        setIsPlaylistPlaying(true);
      } else {
        setIsPlaylistPlaying(false);
      }
      console.log("Track Context: ", state.track.context_uri);
      console.log("Playlist: ", state.playlistInfo.uri);
    }
  }, [state]);

  return (
    <div className="headerContainer" style={headerStyle}>
      <div className="header__left">
        {playButton && (
          <div className="playlistHeader">
            {state.isPlaying && isPlaylistPlaying ? (
              <PauseCircleFilled
                fontSize="small"
                className="headerPlay"
                onClick={handlePlayPausePlaylist}
              />
            ) : (
              <PlayCircleFilled
                fontSize="small"
                className="headerPlay"
                onClick={handlePlayPausePlaylist}
              />
            )}
            <h1 className="playlistNameHeader">{state.playlistInfo.name}</h1>
          </div>
        )}
      </div>
      <div className="header__right">
        <Avatar src={state.user?.images[0]?.url} alt="AN" />
        <h4>Andrew Nwachuku</h4>
      </div>
    </div>
  );
};

export default Header;
