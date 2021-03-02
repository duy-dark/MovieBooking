import FilmTypes from './types';
// import update from 'immutability-helper';

const initialState = {
  status: true,
  loading: 0,
  filmsNow: [],
  filmsFuture: [],
  filmsToday: [],
  theaters: [],
  filmDetail: {},
  seats: [],
  seated: [],
  dayOfWeeks:[[], [], [], [], [], [], []],
  comments: [],
  search: null,
  roomBooking: '',
  listNews: [],
  newDetail: {}
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
      const { seatsMap = [], seatsExisted = [], room_name = '' } = payload
      newState = Object.assign({}, state, { seats: seatsMap, seated: seatsExisted, roomBooking: room_name })
      break;
    case FilmTypes.SEARCH_SUCCESS:
      newState = Object.assign({}, state, { search: payload })
      break;
    case FilmTypes.COMMENT_SUCCESS:
      newState = Object.assign({}, state, { comments: payload })
      break;
    case FilmTypes.CREATE_COMMENT_SUCCESS:
      let { comments } = state;
      newState = Object.assign({}, state, { comments: [payload, ...comments]})
      break;
    case FilmTypes.LOADING_SHOW:
      let newLoading1 = state.loading + 1
      newState = Object.assign({}, state, { loading: newLoading1 < 0 ? 0 : newLoading1 });
      break;
    case FilmTypes.LOADING_HIDE:
      let newLoading2 = state.loading - 1
      newState = Object.assign({}, state, { loading: newLoading2 < 0 ? 0 : newLoading2  });
      break;
    case FilmTypes.LIST_NEW_SUCCESS:
      newState = Object.assign({}, state, {listNews: payload})
      break;
    case FilmTypes.NEW_DETAIL_SUCCESS:
      newState = Object.assign({}, state, {newDetail: payload})
      break;
    default:
      newState = state;
  }
  return newState
}
