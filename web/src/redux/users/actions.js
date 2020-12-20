import UsersTypes from './types';

export function signup(user, history) {
  return {
    type: UsersTypes.LOGIN,
    payload: user,
    history: history
  };
}

export function getListFriend() {
  return {
    type: UsersTypes.LIST_FRIEND
  };
}

export function updateStatusFriend(user) {
  return {
    type: UsersTypes.UDS_FRIEND,
    payload: user
  };
}

export function getUserInfo() {
  return {
    type: UsersTypes.USER_INFO
  };
}

export function signout(history) {
  return {
    type: UsersTypes.LOGOUT,
    history: history
  };
}