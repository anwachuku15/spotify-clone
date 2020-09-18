import React from "react";
import "../css/Sidebar.css";
import SidebarOption from "./SidebarOption";
import { useStateValue } from "../StateProvider";
import { Home, Search, LibraryMusic } from "@material-ui/icons";
import Playlists from "./Playlists";

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

  return (
    <div className="sidebar">
      <div className="navigation">
        <img
          className="sidebar__logo"
          src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
          alt=""
        />
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
