import { Grid } from "@material-ui/core";
import React from "react";
import "../css/SongRow.css";
import { spotify } from "../spotify";
import { useStateValue } from "../StateProvider";

const SongRow = ({ track }) => {
  const [state, dispatch] = useStateValue();

  const setIsPlaying = (isPlaying) => {
    dispatch({
      type: "SET_IS_PLAYING",
      isPlaying: isPlaying,
    });
  };

  const playTrack = (_track) => {
    // console.log(_track);
    spotify
      .play({
        context_uri: _track.context_uri,
        offset: { position: _track.position },
      })
      .then(() => {
        dispatch({
          type: "SET_TRACK",
          track: {
            context_uri: _track.context_uri,
            song: _track.song,
            artists: _track.artists,
            cover: _track.cover,
            duration: _track.duration,
            // volume: _track.device.volume_percent,
          },
        });
        setIsPlaying(true);
      });
  };

  return (
    <div
      className="songRow"
      onClick={() => console.log("keep row highlighted")}
      onDoubleClick={() => playTrack(track)}
    >
      <Grid container spacing={2} alignItems="center">
        {/* <Grid item xs={1}>
          <div className="rowNumber">
            
          </div>
        </Grid> */}
        <Grid item xs={7}>
          <div className="songRow__title">
            {track.uri === state.track.uri && state.isPlaying && (
              <img
                className="rowNumberActive"
                width={14}
                height={14}
                src="https://open.scdn.co/cdn/images/equaliser-animated-green.73b73928.gif"
                alt=""
              />
            )}
            {track.uri === state.track.uri && !state.isPlaying && (
              <p className="rowNumberActive">{track.position + 1}</p>
            )}
            {track.uri !== state.track.uri && (
              <p className="rowNumber">{track.position + 1}</p>
            )}

            <img src={track.cover} alt="" className="albumArt" />
            <div className="songRow__song">
              <span>{track.song}</span>
              <p>{track.artists.map((artist) => artist.name).join(", ")}</p>
            </div>
          </div>
        </Grid>

        <Grid item xs={4}>
          <div className="songRow__album">
            <p>{track.album}</p>
          </div>
        </Grid>

        <Grid item xs={1}>
          <div className="songRow__duration">
            <p>{track.duration}</p>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default SongRow;
