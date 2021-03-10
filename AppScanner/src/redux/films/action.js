import FilmTypes from "./types";

export function getTicketDetail(id_ticket) {
    // alert(id_ticket)
    return {
      type: FilmTypes.GET_TICKETDETAIL,
      payload: id_ticket
    }
}

export function getCouponDetail(id_coupon) {
  return {
    type: FilmTypes.GET_COUPON,
    payload: id_coupon
  }
}