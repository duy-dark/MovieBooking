import UsersTypes from "./types";
// import update from 'immutability-helper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  status: true,
  loading: false,
  user: null,
  token: null,
  isRegister: false,
  header: true,
  footer: true,
  categories: [],
  categories_favorie: []
};

const storeData = async (storage, value) => {
  try {
    await AsyncStorage.setItem(storage, value)
  } catch (e) {
    // saving error
  }
}

const removeData = async (storage) => {
  try {
      await AsyncStorage.removeItem(storage);
      return true;
  }
  catch(exception) {
      return false;
  }
}

export default function userReducer(state = initialState, action) {
  let newState;

  const { type, payload = {} } = action;
  switch (type) {
    case UsersTypes.LOGIN_SUCCESS:
      storeData("token",payload.token)
      storeData("userID",payload.customer._id)
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
      removeData("token");
      removeData("userID");
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
    case UsersTypes.GET_CATEGORIES_SUCCESS:
      newState = Object.assign({}, state, {categories: payload})
      break
    case UsersTypes.POST_CATEGORIES_SUCCESS:
      newState = Object.assign({}, state, {categories_favorie: payload})
      break;
    case UsersTypes.LOADING_SHOW:
      newState = Object.assign({}, state, { loading: true });
      break;
    case UsersTypes.LOADING_HIDE:
      newState = Object.assign({}, state, { loading: false });
      break;
    default:
      newState = state;
  }
  return newState;
}
