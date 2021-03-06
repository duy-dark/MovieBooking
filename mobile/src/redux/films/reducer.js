import FilmTypes from './types';
// import update from 'immutability-helper';

const initialState = {
  status: true,
  loading: false, 
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
  tickets: [],
  filmsNowFavorite: [],
  filmsFutureFavorie: [],
  ticketDetail: {},
}

export default function filmsReducer(state = initialState, action) {
  let newState;
  let { comments = [] } = state
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
      newState = Object.assign({}, state, {})
      break;
    case FilmTypes.LOADING_SHOW:
      newState = Object.assign({}, state, { loading: true });
      break;
    case FilmTypes.LOADING_HIDE:
      newState = Object.assign({}, state, { loading: false });
      break;
    case FilmTypes.GET_TICKETS_SUCCESS:
      newState = Object.assign({}, state, { tickets: payload});
      break;
    case FilmTypes.LIST_FILM_NOW_FAVORITE_SUCCESS:
      newState = Object.assign({}, state, { filmsNowFavorite: payload })
      break;
    case FilmTypes.LIST_FILM_FUTURE_FAVORITE_SUCCESS:
      newState = Object.assign({}, state, { filmsFutureFavorite: payload })
      break;
    case FilmTypes.GET_TICKETDETAIL_SUCCESS:
      newState = Object.assign({}, state, { ticketDetail: payload })
      break;
    default:
      newState = state;
  }
  return newState
}
