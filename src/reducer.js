export const initialState = {
  user: null,
  // token:
  //   "BQALLHUeSR6VzeqsrmMAChCG5XH-ciX5LYyamJWO4xG8BmZOasgqK84GcfGxmK0Ev9W6xbfFCmtryf_oDKQQJCCxieKr172N6lAod__a-TNKUrctHX2UvrHbgU5maoL5XMJ94kvNqJqgO-M7se65YrlfcGA",
  playlists: [],
  isPlaying: false,
  item: null,
  selectedPlaylistId: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_TOKEN":
      return {
        ...state,
        token: action.token,
      };
    case "SET_PLAYLISTS":
      return {
        ...state,
        playlists: action.playlists,
      };
    case "SELECT_PLAYLIST":
      return {
        ...state,
        playlistInfo: action.playlistInfo,
        playlistTracks: action.playlistTracks,
      };
    case "SET_CURRENT_PLAYBACK":
      console.log(action.playback);
      return {
        ...state,
        playback: action.playback,
      };
    default:
      return state;
  }
};
