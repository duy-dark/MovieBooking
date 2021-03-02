import CinemaTypes from "./types";

const initialState = {
    status: true,
    loading: true,
    cinemasList: [],
    cinemaDetails: {},
    dayOfWeeks:[[], [], [], [], [], [], []],

}

export default function cinemasReducer(state = initialState, action) {
    let newState;
  
    const { type, payload = {} } = action;
    switch (type) {
      case CinemaTypes.LIST_CINEMAS_SUCCESS:
        newState = Object.assign({}, state, { cinemasList: payload})
        break;
      case CinemaTypes.CINEMA_DETAIL_SUCCESS:
        newState = Object.assign({}, state, { cinemaDetails: payload.detail, dayOfWeeks:payload.dayOfWeeks})
        break;
      case CinemaTypes.LOADING_SHOW:
        newState = Object.assign({}, state, { loading: true });
        break;
      case CinemaTypes.LOADING_HIDE:
        newState = Object.assign({}, state, { loading: false });
        break;
      default:
        newState = state;
    }
    return newState
}