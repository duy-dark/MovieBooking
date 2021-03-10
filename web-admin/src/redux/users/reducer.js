import UsersTypes from "./types";
// import update from 'immutability-helper';
import findIndex from "lodash/findIndex";

const initialState = {
  status: true,
  user: null,
  token: null,
  isRegister: false,
  header: true,
  footer: true,
  listCustomer: [],
  loading: 0
};

export default function userReducer(state = initialState, action) {
  let newState;

  const { type, payload = {} } = action;
  switch (type) {
    case UsersTypes.LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      localStorage.setItem("userID", payload.admin._id);
      newState = Object.assign({}, state, {
        user: payload.admin ,
        token: payload.token,
      });
      break;
   
    case UsersTypes.USER_INFO_SUCCESS:
      newState = Object.assign({}, state, { user: payload });
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
    case UsersTypes.LIST_CUSTOMER_SUCCESS:
      newState = Object.assign({}, state, { listCustomer: payload })
      break;
    case UsersTypes.UPDATE_CUSTOMER_SUCCESS:
      let arr = [...state.listCustomer]
      let index = findIndex(arr, item => item._id === payload._id)
      arr[index] = payload
      newState = Object.assign({}, state, { listCustomer: [...arr] })
      break;
    default:
      newState = state;
  }
  return newState;
}
