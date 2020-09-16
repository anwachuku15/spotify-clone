import React from "react";
import "../css/Playlists.css";
import SidebarOption from "./SidebarOption";
import { useStateValue } from "../StateProvider";
import { Button } from "@material-ui/core";

const Playlists = () => {
  const [state, dispatch] = useStateValue();
  // console.log(state);

  const handleSelectPlaylist = (id) => {
    dispatch({
      type: "SELECT_PLAYLIST",
      playlistId: id,
    });
  };

  return (
    <div className="playlists">
      {state.playlists?.items?.map((playlist) => (
        <Button
          onClick={() => handleSelectPlaylist(playlist.id)}
          style={{
            textTransform: "none",
            width: "100%",
            justifyContent: "flex-start",
            padding: 0,
            textAlign: "start",
            // textOverflow: "ellipsis",
          }}
        >
          <SidebarOption option={playlist.name} id={playlist.id} />
        </Button>
      ))}
    </div>
  );
};

export default Playlists;
