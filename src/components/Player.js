import React from "react";
import "../css/Player.css";
import Sidebar from "./Sidebar";
import Body from "./Body";
import Footer from "./Footer";
import { useStateValue } from "../StateProvider";

const Player = ({ spotify }) => {
  const [state] = useStateValue();

  // const playlist = {
  //   info: state.playlistInfo,
  //   tracks: state.playlistTracks,
  // };

  // const onSpacebar = (key) => {
  //   if (key === " ") {
  //     console.log(state.isPlaying);
  //   }
  // };
  return (
    <div
      className="player"
      // onKeyDown={(e) => onSpacebar(e.key)}
      // tabIndex={0}
    >
      <div className="player__body">
        <Sidebar />
        <Body spotify={spotify} />
      </div>
      {state.playlists && <Footer />}
    </div>
  );
};

export default Player;
