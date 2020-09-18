import React from "react";
import "../css/Sidebar.css";
import SidebarOption from "./SidebarOption";
import { useStateValue } from "../StateProvider";
import { Home, Search, LibraryMusic } from "@material-ui/icons";
import Playlists from "./Playlists";
import { Tooltip } from "@material-ui/core";

const Sidebar = () => {
  const [state, dispatch] = useStateValue();

  const goHome = () => {
    console.log("HOME");
    dispatch({
      type: "SET_PLAYLIST",
      playlistInfo: null,
      playlistTracks: null,
    });
  };

  const goToSpotify = () => {
    window.open("https://open.spotify.com/");
  };
  return (
    <div className="sidebar">
      <div className="navigation">
        <Tooltip title="Go To Spotify">
          <img
            className="sidebar__logo"
            src={require("../assets/img/logos/white.png")}
            alt=""
            onClick={goToSpotify}
          />
        </Tooltip>
        <SidebarOption Icon={Home} option="Home" handleClick={goHome} />
        <SidebarOption Icon={Search} option="Search" />
        <SidebarOption Icon={LibraryMusic} option="Your Library" />

        <br />
      </div>

      <strong className="sidebar__title">PLAYLISTS</strong>
      <hr />

      <Playlists />
    </div>
  );
};

export default Sidebar;
