import UsersTypes from "./types";

export function signIn(user, history) {
  return {
    type: UsersTypes.LOGIN,
    payload: user,
    history: history,
  };
}

export function getListFriend() {
  return {
    type: UsersTypes.LIST_FRIEND,
  };
}

export function updateStatusFriend(user) {
  return {
    type: UsersTypes.UDS_FRIEND,
    payload: user,
  };
}

export function getUserInfo(payload) {
  return {
    payload: payload,
    type: UsersTypes.USER_INFO,
  };
}

export function signOut(history) {
  return {
    type: UsersTypes.LOGOUT,
    history: history,
  };
}

export function signTest(user, history) {
  return {
    type: UsersTypes.LOGIN_TEST,
    user: user,
    history: history,
  };
}

export function updateHeaderFooter(status) {
  return {
    type: UsersTypes.UPDATE_HF,
    status: status,
  };
}
