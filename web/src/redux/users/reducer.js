import UsersTypes from "./types";
// import update from 'immutability-helper';

const initialState = {
  status: true,
  loading: 0,
  user: null,
  token: null,
  isRegister: false,
  header: true,
  footer: true,
  tickets:[]
};

export default function userReducer(state = initialState, action) {
  let newState;

  const { type, payload = {} } = action;
  switch (type) {
    case UsersTypes.LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      localStorage.setItem("userID", payload.customer._id);
      newState = Object.assign({}, state, {
        user: payload.customer,
        token: payload.token,
      });
      break;
    case UsersTypes.LIST_FRIEND_SUCCESS:
      newState = Object.assign({}, state, { friends: payload.friends });
      break;
    case UsersTypes.USER_INFO_SUCCESS:
      newState = Object.assign({}, state, { user: payload });
      break;
    case UsersTypes.UDS_FRIEND_SUCCESS:
      const { friends } = state;
      let newFriends = [...friends].map((friend) => {
        if (friend.id === +payload.id) {
          friend.status = payload.status;
        }
        return friend;
      });

      newState = Object.assign({}, state, { friends: newFriends });
      break;
    case UsersTypes.LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      localStorage.removeItem("userID");
      newState = Object.assign({}, state, {
        token: null,
        user: null,
        friends: [],
      });
      break;
    case UsersTypes.LOGIN_TEST_SUCCESS:
      newState = Object.assign({}, state, { user: payload });
      break;
    case UsersTypes.UPDATE_HF_SUCCESS:
      newState = Object.assign({}, state, {
        header: payload.header,
        footer: payload.footer,
      });
      break;
    case UsersTypes.LOADING_SHOW:
      newState = Object.assign({}, state, { loading: state.loading++ });
      break;
    case UsersTypes.LOADING_HIDE:
      newState = Object.assign({}, state, { loading: state.loading-- });
      break;
    case UsersTypes.TICKET_INFO_SUCCESS:
      newState = Object.assign({}, state, { tickets: payload }); 
      break
    default:
      newState = state;
  }
  return newState;
}
