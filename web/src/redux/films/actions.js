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
