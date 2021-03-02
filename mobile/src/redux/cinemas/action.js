import CinemaTypes from "./types";

export function getListCinemas() {
    return {
      type: CinemaTypes.LIST_CINEMAS,
    };
}

export function getCinemaDetails(id) {
    return {
      type: CinemaTypes.CINEMA_DETAIL,
      payload: id,
    };
}