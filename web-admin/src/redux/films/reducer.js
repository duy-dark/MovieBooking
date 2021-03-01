import FilmTypes from './types';
// import update from 'immutability-helper';

const initialState = {
  status: true,
  filmsNow: [],
  filmsFuture: [],
  filmsToday: [],
  theaters: [],
  filmDetail: {},
  seats: [],
  dayOfWeeks:[],
  categories:[]
}

export default function filmsReducer(state = initialState, action) {
  let newState;

  const { type, payload = {} } = action;
  switch (type) {
    case FilmTypes.FILM_DETAIL_SUCCESS:
      newState = Object.assign({}, state, { filmDetail: payload.detail,dayOfWeeks:payload.dayOfWeeks})
      break;
    case FilmTypes.LIST_FILM_NOW_SUCCESS:
      newState = Object.assign({}, state, { filmsNow: payload })
      break;
    case FilmTypes.LIST_FILM_FUTURE_SUCCESS:
      newState = Object.assign({}, state, { filmsFuture: payload })
      break;
    case FilmTypes.LIST_FILM_TODAY_SUCCESS:
      newState = Object.assign({}, state, { filmsToday: payload })
      break;
    case FilmTypes.LIST_SEATS_SUCCESS:
      newState = Object.assign({}, state, { seats: payload.seats })
      break;
    case FilmTypes.UPDATE_FILM_DETAIL_SUCCESS:
      newState = Object.assign({},state,{filmUpdate : payload})
      break;
    case FilmTypes.LIST_CATEGOGY_SUCCESS:
      
      newState = Object.assign({},state,{categories : payload})
      break;
    default:
      newState = state;
  }
  return newState
}
