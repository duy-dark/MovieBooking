import FilmTypes from './types';
// import update from 'immutability-helper';

const initialState = {
    loading: false, 
    ticketDetail: {},
    couponDetail: {}
}

export default function filmsReducer(state = initialState, action) {
  let newState;

  const { type, payload = {} } = action;
  switch (type) {
    case FilmTypes.LOADING_SHOW:
        newState = Object.assign({}, state, { loading: true });
        break;
    case FilmTypes.LOADING_HIDE:
        newState = Object.assign({}, state, { loading: false });
        break;
    case FilmTypes.GET_TICKETDETAIL_SUCCESS:
      newState = Object.assign({}, state, { ticketDetail: payload })
      break;
    case FilmTypes.GET_COUPON_SUCCESS:
      newState = Object.assign({}, state, { couponDetail: payload })
      break;
    default:
      newState = state;
  }
  return newState
}
