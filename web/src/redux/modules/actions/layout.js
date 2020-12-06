import * as types from '../types';

export function showSpinner() {
  return {
    type: types.SHOW_LOADING
  }
}

export function hideSpinner() {
  return {
    type: types.HIDE_LOADING
  }
}

