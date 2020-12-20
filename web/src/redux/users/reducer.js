import UsersTypes from './types';
// import update from 'immutability-helper';

const initialState = {
  state: true,
  user: null,
  token: null,
  isRegister: false
}

export default function userReducer(state = initialState, action) {
  let newState;

  const { type, payload = {} } = action;
  switch (type) {
    case UsersTypes.LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token)
      localStorage.setItem('userID', payload.user.id)
      newState = Object.assign({}, state, { user: payload.user, token: payload.token });
      break;
    case UsersTypes.LIST_FRIEND_SUCCESS:
      newState = Object.assign({}, state, { friends: payload.friends });
      break;
    case UsersTypes.USER_INFO_SUCCESS:
      newState = Object.assign({}, state, { user: payload.user });
      break;
    case UsersTypes.UDS_FRIEND_SUCCESS:
      const { friends } = state;
      let newFriends = [...friends].map((friend) => {
        if (friend.id === +payload.id) {
          friend.status = payload.status
        }
        return friend
      })

      newState = Object.assign({}, state, { friends: newFriends });
      break;
    case UsersTypes.LOGOUT_SUCCESS:
      localStorage.removeItem('token')
      localStorage.removeItem('userID')
      newState = Object.assign({}, state, { token: null, user: null, friends: [] });
      break;
    default: 
      newState = state;
  }
  return newState
}