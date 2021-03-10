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
export function getFilmSchedules(info) {
  return {
    type: FilmTypes.FILM_SCHEDULE,
    payload: info,
  };
}
export function updateFilmSchedules(id,data) {
  return {
    type: FilmTypes.UPDATE_FILM_SCHEDULE,
    payload: data,
    id:id
  };
}
export function deleteFilmSchedules(data) {
  return {
    type: FilmTypes.DELETE_FILM_SCHEDULE,
    payload: data,
  };
}
export function updateFilmDetail(id,data) {
  return {
    type: FilmTypes.UPDATE_FILM_DETAIL,
    payload: data,
    id:id
  };
}
export function createFilmSchedules(data) {
  return {
    type: FilmTypes.CREATE_FILM_SCHEDULE,
    payload: data,
    
  };
}
export function getTheaters(){
  return {
    type: FilmTypes.LIST_THEATER,
  };
}
export function getTickets(){
  return {
    type: FilmTypes.LIST_TICKET,
  };
}
export function createNewPaper(params) {
  return {
    type: FilmTypes.CREATE_NEW,
    payload: params
  }
}

export function getListNew(){
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

export function updateNewDetail(params) {
  return {
    type: FilmTypes.UPDATE_NEW,
    payload: params
  }
}

export function getTheaterDetail(id) {
  return {
    type: FilmTypes.THEATER_DETAIL,
    payload: id
  }
}

export function updateTheater(params) {
  return {
    type: FilmTypes.THEATER_UPDATE,
    payload: params
  }
}

export function getRoomDetail(id) {
  return {
    type: FilmTypes.ROOM_DETAIL,
    payload: id
  }
}

export function updateRoom(params) {
  return {
    type: FilmTypes.ROOM_UPDATE,
    payload: params
  }
}

export function createTheater(params, history) {
  return {
    type: FilmTypes.CREATE_THEATER,
    payload: params,
    history: history
  }
}

export function createRoom(params, history) {
  return {
    type: FilmTypes.ROOM_CREATE,
    payload: params,
    history: history
  }
}

export function deleteRoom(params) {
  return {
    type: FilmTypes.DELETE_ROOM,
    payload: params
  }
}

export function deleteTheater(params) {
  return {
    type: FilmTypes.DELETE_THEATER,
    payload: params
  }
}