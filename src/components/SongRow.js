import { Grid } from "@material-ui/core";
import React from "react";
import "../css/SongRow.css";
const SongRow = ({ track }) => {
  return (
    <div className="songRow">
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={7}>
          <div className="songRow__title">
            <img src={track.cover} alt="" />
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
