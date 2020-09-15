export const initialState = {
  user: null,
  // set initial token to null after development
  // token:
  //   "BQALLHUeSR6VzeqsrmMAChCG5XH-ciX5LYyamJWO4xG8BmZOasgqK84GcfGxmK0Ev9W6xbfFCmtryf_oDKQQJCCxieKr172N6lAod__a-TNKUrctHX2UvrHbgU5maoL5XMJ94kvNqJqgO-M7se65YrlfcGA",
  playlists: [],
  isPlaying: false,
  item: null,
};

export const reducer = (state, action) => {
  // console.log(action);

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
    default:
      return state;
  }
};
