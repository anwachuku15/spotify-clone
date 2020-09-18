import React, { useCallback, useEffect, useState } from "react";
import "../css/Footer.css";
import {
  PlayCircleOutline,
  PauseCircleOutline,
  SkipPrevious,
  SkipNext,
  Shuffle,
  Repeat,
  PlaylistPlay,
  SpeakerGroupOutlined,
} from "@material-ui/icons";
import { Grid, Slider, Tooltip } from "@material-ui/core";
import {
  VolumeDown,
  VolumeUp,
  VolumeMute,
  VolumeOff,
} from "@material-ui/icons";
import { useStateValue } from "../StateProvider";
import { spotify } from "../spotify";

const Footer = () => {
  const [state, dispatch] = useStateValue();
  const [spaceToggle, setSpaceToggle] = useState();
  const [volume, setVolume] = useState(0);
  const [beforeMute, setBeforeMute] = useState();
  const [currentTrack, setCurrentTrack] = useState(state.track);
  const [currentPlaylist, setCurrentPlaylist] = useState();
  const [device, setDevice] = useState();

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
          song: track.item.name,
          artists: track.item.artists,
          cover: track.item.album.images[0].url,
          duration: getTrackDuration(track.item.duration_ms),
          // volume: track.device.volume_percent,
        },
      });
    }
  };

  useEffect(() => {
    spotify
      .getMyCurrentPlaybackState()
      .then((res) => {
        if (res) {
          console.log(res);
          setDevice(res.device.type);
          setIsPlaying(res.is_playing);
          setTrack(res);
          setVolume(res.device.volume_percent);
        }
      })
      .catch((err) => console.log(err));
  }, [spotify]);

  const handlePlayPause = () => {
    if (state.isPlaying) {
      spotify.pause();
      setIsPlaying(false);
    } else {
      spotify.play();
      setIsPlaying(true);
    }
  };

  const nextSong = () => {
    spotify.skipToNext().then(() => {
      spotify.getMyCurrentPlayingTrack().then((res) => {
        setTrack(res);
        setIsPlaying(true);
      });
    });
  };

  const prevSong = () => {
    spotify.skipToPrevious().then(() => {
      spotify.getMyCurrentPlayingTrack().then((res) => {
        setTrack(res);
        setIsPlaying(true);
      });
    });
  };

  const handleVolume = (event, newValue) => {
    spotify.setVolume(newValue).catch((err) => console.log(err));
    setVolume(newValue);
  };

  const toggleMute = () => {
    if (volume > 0) {
      spotify.setVolume(0).catch((err) => console.log(err));
      setBeforeMute(volume);
      setVolume(0);
    } else {
      spotify.setVolume(beforeMute).catch((err) => console.log(err));
      setVolume(beforeMute);
    }
  };

  const playlistTooltip = (track) => {
    const thisPlaylist = state.playlists.items.find(
      (item) => item.uri === track.context_uri
    );
    setCurrentPlaylist(thisPlaylist.name);
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

  return (
    <div className="footer">
      {state.track ? (
        <div className="footer__left">
          <img src={state.track.cover} className="songImg" alt="" />
          <div className="footer__songInfo">
            <p className="songName">{state.track.song}</p>
            <p className="artist">
              {state.track.artists.map((artist) => artist.name).join(", ")}
            </p>
          </div>
        </div>
      ) : (
        <div className="footer__left">
          <img src={require("../img/spotify.png")} className="songImg" alt="" />
          <div className="footer__songInfo">
            <p className="songName">No Available Devices!</p>
            <p className="artist">Open Spotify on any device</p>
          </div>
        </div>
      )}

      <div className="footer__center">
        <div className="controls">
          <Shuffle className="footer__green" />
          <SkipPrevious className="footer__icon" onClick={prevSong} />
          {state.isPlaying ? (
            <PauseCircleOutline
              fontSize="large"
              className="footer__icon"
              onClick={handlePlayPause}
            />
          ) : (
            <PlayCircleOutline
              fontSize="large"
              className="footer__icon"
              onClick={handlePlayPause}
            />
          )}
          <SkipNext className="footer__icon" onClick={nextSong} />
          <Repeat className="footer__green" />
        </div>
        {/* <div className="progress">
          <p className="currentProgress">0:00</p>
          <Slider
            aria-labelledby="continuous-slider"
            value={state.track ? progress : 0}
            onChange={handleProgress}
          />
          <p className="duration">{state.track && state.track.duration}</p>
        </div> */}
      </div>

      <div className="footer__right">
        <div className="rightControls">
          <Grid container spacing={2}>
            <Grid item>
              <Tooltip title={currentPlaylist} placement="top">
                <PlaylistPlay
                  className="playlistButton"
                  onClick={() => playlistButton(state.track)}
                  onMouseOver={() => playlistTooltip(state.track)}
                />
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title={device} placement="top">
                <SpeakerGroupOutlined className="playlistButton" />
              </Tooltip>
            </Grid>
            <Grid item>
              {volume < 1 && <VolumeOff onClick={toggleMute} />}
              {volume >= 1 && volume <= 5 && (
                <VolumeMute onClick={toggleMute} />
              )}
              {volume > 5 && volume <= 67 && (
                <VolumeDown onClick={toggleMute} />
              )}
              {volume > 67 && <VolumeUp onClick={toggleMute} />}
            </Grid>
            <Grid item xs>
              <Slider
                aria-labelledby="continuous-slider"
                value={state.track ? volume : 0}
                style={{
                  width: 100,
                }}
                onChange={handleVolume}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Footer;
