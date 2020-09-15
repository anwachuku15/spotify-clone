import React from "react";
import "../css/Playlists.css";
import SidebarOption from "./SidebarOption";
import { useStateValue } from "../StateProvider";

const Playlists = () => {
  const [state, dispatch] = useStateValue();
  console.log(state);

  return (
    <div className="playlists">
      {state.playlists?.items?.map((playlist) => (
        <SidebarOption option={playlist.name} />
      ))}
    </div>
  );
};

export default Playlists;
