import React, { useEffect, useState } from "react";
import "../css/Footer.css";
import {
  PlayCircleOutline,
  SkipPrevious,
  SkipNext,
  Shuffle,
  Repeat,
  PlaylistPlay,
} from "@material-ui/icons";
import { Grid, Slider } from "@material-ui/core";
import { VolumeDown } from "@material-ui/icons";
import { useStateValue } from "../StateProvider";
import { spotify } from "../spotify";

const Footer = () => {
  const [state, dispatch] = useStateValue();
  const [volume, setVolume] = useState(0);

  useEffect(() => {
    if (state.playback) {
      setVolume(state.playback.volume);
    }
  }, [state]);

  // const playSong = () => {

  // }

  // const pauseSong = () => {

  // }

  // const nextSong = () => {

  // }

  // const prevSong = () => {

  // }

  // const handleChangeVolume = (event, newValue) => {
  //   spotify.setVolume(newValue)
  // }

  // const volumeUp = () => {

  // }

  // const volumeDown = () => {

  // }

  return (
    <div className="footer">
      {state.playback ? (
        <div className="footer__left">
          <img src={state.playback.cover} className="songImg" alt="" />
          <div className="footer__songInfo">
            <p className="songName">{state.playback && state.playback.song}</p>
            <p className="artist">{state.playback.artists[0].name}</p>
          </div>
        </div>
      ) : (
        <div className="footer__left">
          <img
            src={require("../img/popstar.jpeg")}
            className="songImg"
            alt=""
          />
          <div className="footer__songInfo">
            <p className="songName">POPSTAR (feat. Drake)</p>
            <p className="artist">DJ Khaled, Drake</p>
          </div>
        </div>
      )}

      <div className="footer__center">
        <Shuffle className="footer__green" />
        <SkipPrevious className="footer__icon" />
        <PlayCircleOutline fontSize="large" className="footer__icon" />
        <SkipNext className="footer__icon" />
        <Repeat className="footer__green" />
      </div>

      <div className="footer__right">
        <div className="rightControls">
          <Grid container spacing={2}>
            <Grid item>
              <PlaylistPlay />
            </Grid>
            <Grid item>
              <VolumeDown />
            </Grid>
            <Grid item xs>
              {state.playback ? (
                <Slider
                  aria-labelledby="continuous-slider"
                  value={volume}
                  style={{
                    color: "#1ed15e",
                    width: 100,
                  }}
                />
              ) : (
                <Slider
                  aria-labelledby="continuous-slider"
                  style={{
                    color: "#1ed15e",
                    width: 100,
                  }}
                />
              )}
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Footer;
