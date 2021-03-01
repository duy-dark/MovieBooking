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

export function getComments(id) {
  return {
    type: FilmTypes.COMMENT,
    payload: id
  };
}
export function getCategories(){
  return {
    type: FilmTypes.LIST_CATEGOGY,
  };
}
export function addNewFilm(data) {
  return {
    type: FilmTypes.ADD_NEW_FILM,
    payload: data
  };
}