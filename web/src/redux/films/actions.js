import FilmTypes from "./types";

export function getListFilmNow() {
  return {
    type: FilmTypes.LIST_FILM_NOW,
  };
}

export function getListFilmFuture() {
  return {
    type: FilmTypes.LIST_FILM_FUTURE,
  };
}
export function getListFilmToday() {
  return {
    type: FilmTypes.LIST_FILM_TODAY
  }
}

export function postBookingInfo(bookingInfo, history) {
  return {
    type: FilmTypes.POST_BOOKING_INFO,
    payload: bookingInfo,
    history,
  };
}

export function getFilmDetails(info) {
  return {
    type: FilmTypes.FILM_DETAIL,
    payload: info,
  };
}

export function getSeats(id) {
  return {
    type: FilmTypes.LIST_SEATS,
    payload: id,
  };
}

export function getSearch() {
  return {
    type: FilmTypes.SEARCH,
  };
}

export function getComments(params) {
  return {
    type: FilmTypes.COMMENT,
    payload: params
  };
}

export function createComment(params) {
  return {
    type: FilmTypes.CREATE_COMMENT,
    payload: params
  }
}

export function paymentGateway({ params, history }) {
  return {
    type: FilmTypes.PAYMENT_MOMO,
    payload: params,
    history: history
  }
}

export function getListNew() {
  return {
    type: FilmTypes.LIST_NEW
  }
}

export function getNewDetail(id) {
  return {
    type: FilmTypes.NEW_DETAIL,
    payload: id
  }
}

