import * as types from '../types';

export function getUsers(users) {
  return {
    type: types.LOGIN,
    payload: users
  }
}

export function clearToken() {
  return {
    type: types.CLEAR_TOKEN
  }
}
