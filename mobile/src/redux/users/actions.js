import UsersTypes from "./types";

export function signIn(user, navigation) {
  return {
    type: UsersTypes.LOGIN,
    payload: user,
    navigation: navigation
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

export function getUserInfo(payload, navigation) {
  return {
    payload: payload,
    type: UsersTypes.USER_INFO,
    navigation: navigation
  };
}

export function signOut(navigation) {
  return {
    type: UsersTypes.LOGOUT,
    navigation: navigation
  };
}

export function signTest(user, history) {
  return {
    type: UsersTypes.LOGIN_TEST,
    user,
    history,
  };
}

export function updateHeaderFooter(status) {
  return {
    type: UsersTypes.UPDATE_HF,
    status,
  };
}

export function getCategories() {
  return {
    type: UsersTypes.GET_CATEGORIES,
  }
}

export function postCategories(payload, navigation) {
  return {
    type: UsersTypes.POST_CATEGORIES,
    payload: payload,
    navigation: navigation
  };
}

