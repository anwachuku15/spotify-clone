export const initialState = {
  user: null,
  // set initial token to null after development
  token:
    "BQC92QFmdmzC-UQv4hK2sYV6Ce8cZW0oKby54yrs5DyyOer9sr7sZ660YFGhYrkQ9opqQLzix8fY9-yiPHuLT4hMvYxPhMAgmRXz0f1s2eKo8XB129xxxPeOgp1bPYewc_cmv17lhW6ipQpQL6HVdzcjrSw",
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
    default:
      return state;
  }
};
