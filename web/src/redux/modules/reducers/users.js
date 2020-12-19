import * as types from "./../types";

const initialState = {
  state: true,
  users: {},
  tokens: null,
};

export default function users(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return { ...state, users: action.payload.user, token: action.payload.token };
    case types.CLEAR_TOKEN:
      localStorage.clearItem("token");
      return { ...state, users: {}, token: null };

    default:
      return state;
  }
}
