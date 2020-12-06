import * as types from '../types';

const initialState = {
  state: true,
  loading: 0,
  handleError: undefined
}

export default function users(state = initialState, action) {
  switch (action.type) {
    case types.SHOW_LOADING:
      let loadingShow = state.loading + 1
      return { ...state, loading: loadingShow }
    case types.HIDE_LOADING:
      let loadingHide = state.loading - 1
      return { ...state, loading: loadingHide < 0 ? 0 : loadingHide }
    default: return state;
  }
}
