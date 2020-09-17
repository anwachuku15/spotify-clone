import React from "react";
import "../css/SidebarOption.css";

import { useStateValue } from "../StateProvider";

const SidebarOption = ({ option, id, Icon }) => {
  const [state] = useStateValue();
  const activePlaylistId = state.playlistInfo ? state.playlistInfo.id : 0;
  return (
    <div
      className={
        activePlaylistId === id ? "sidebarOptionActive" : "sidebarOption"
      }
    >
      {Icon && <Icon className="sidebarOption__icon" />}
      {Icon ? <h5>{option}</h5> : <p className="optionText">{option}</p>}
    </div>

    // <hr />
  );
};

export default SidebarOption;
