import React from "react";
import "../css/Playlists.css";
import SidebarOption from "./SidebarOption";
import { useStateValue } from "../StateProvider";
import { Button } from "@material-ui/core";
import { spotify } from "../spotify";

const Playlists = () => {
  const [state, dispatch] = useStateValue();
  // console.log(state);

  const getTrackDuration = (ms) => {
    const min = Math.floor(ms / 60000);
    const sec = ((ms % 60000) / 1000).toFixed(0);
    const duration = min + ":" + (sec < 10 ? "0" : "") + sec;

    return duration;
  };

  const getPlaylistDuration = (ms) => {
    let hr = Math.floor((ms / 3600000) % 24);
    let min = Math.floor((ms / 60000) % 60);

    let duration;
    if (hr < 1) {
      duration = min + " min";
    } else {
      duration = hr + " hr " + min + " min";
    }

    return duration;
  };

  const handleSelectPlaylist = (id) => {
    let playlistTracks = [];
    let playlistInfo;
    let playlistDuration = 0;
    let playlistLength = -1;
    spotify
      .getPlaylist(id)
      .then((playlist) => {
        // console.log(playlist);
        playlist.tracks.items.forEach((item) => {
          playlistDuration += item.track.duration_ms;
          playlistLength++;
          playlistTracks.push({
            playlist: playlist.name,
            position: playlistLength,
            context_uri: playlist.uri,
            uri: item.track.uri,
            song: item.track.name,
            artists: item.track.artists,
            album: item.track.album.name,
            cover: item.track.album.images[0].url,
            explicit: item.track.explicit,
            duration: getTrackDuration(item.track.duration_ms),
          });
        });
        playlistInfo = {
          id: playlist.id,
          uri: playlist.uri,
          name: playlist.name,
          owner: playlist.owner.display_name,
          image: playlist.images[0].url,
          description: playlist.description,
          followers: playlist.followers.total
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          duration: getPlaylistDuration(playlistDuration),
        };

        const playlistData = {
          playlistInfo: playlistInfo,
          playlistTracks: playlistTracks,
        };
        return playlistData;
      })
      .then((playlistData) => {
        console.log(playlistData.playlistInfo);
        dispatch({
          type: "SELECT_PLAYLIST",
          playlistInfo: playlistData.playlistInfo,
          playlistTracks: playlistData.playlistTracks,
        });
      })
      .catch((err) => console.log(err));
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
