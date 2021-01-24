import FilmTypes from './types';
// import update from 'immutability-helper';

const initialState = {
  status: true,
  filmsNow: [],
  filmsFuture: [],
  theaters: [],
  filmDetail: {},

}

export default function filmsReducer(state = initialState, action) {
  let newState;

  const { type, payload = {} } = action;
  switch (type) {
    case FilmTypes.FILM_DETAIL_SUCCESS:
      newState = Object.assign({}, state, { filmDetail: payload })
      break;
    case FilmTypes.LIST_FILM_NOW_SUCCESS:
      newState = Object.assign({}, state, { filmsNow: payload })
      break;
    case FilmTypes.LIST_FILM_FUTURE_SUCCESS:
      newState = Object.assign({}, state, { filmsFuture: payload })
      break;
    default:
      newState = state;
  }
  return newState
}
