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

export function createComment({ params, navigation }) {
  return {
    type: FilmTypes.CREATE_COMMENT,
    payload: params,
    navigation: navigation
  }
}

export function getTickets(id_user) {
  return {
    type: FilmTypes.GET_TICKETS,
    payload: id_user
  }
}

export function getListFilmFutureFavorite(id_user) {
  // alert(id_user)
  return {
    type: FilmTypes.LIST_FILM_FUTURE_FAVORITE,
    payload: id_user
  }
}

export function goBack() {
  return {
    type: FilmTypes.GO_BACK
  }
}

export function postBookingInfo(bookingInfo) {
  return {
    type: FilmTypes.POST_BOOKING_INFO,
    payload: bookingInfo
  };
}

export function paymentGateway({ params, Linking, navigation }) {
  return {
    type: FilmTypes.PAYMENT_MOMO,
    payload: params,
    Linking: Linking,
    navigation: navigation
  }
}

export function getTicketDetail(id_ticket) {
  // alert(id_ticket)
  return {
    type: FilmTypes.GET_TICKETDETAIL,
    payload: id_ticket
  }
}

export function getListFilmNowFavorite(id_user) {
  // alert(id_user)
  return {
    type: FilmTypes.LIST_FILM_NOW_FAVORITE,
    payload: id_user
  }
}