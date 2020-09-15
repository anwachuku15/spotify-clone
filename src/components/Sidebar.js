import React from "react";
import "../css/Sidebar.css";
import SidebarOption from "./SidebarOption";

import { Home, Search, LibraryMusic } from "@material-ui/icons";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <img
        className="sidebar__logo"
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt=""
      />
      <SidebarOption Icon={Home} option="Home" />
      <SidebarOption Icon={Search} option="Search" />
      <SidebarOption Icon={LibraryMusic} option="Your Library" />

      <br />

      <strong className="sidebar__title">PLAYLISTS</strong>

      <hr />
    </div>
  );
};

export default Sidebar;
