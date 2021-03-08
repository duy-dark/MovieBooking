import Api from "./api";

const getListFilmShowing = (params) => {
  return Api.get("/api/film", params).then((res) => res.data);
};

const getListFilmNow = () => {
  return Api.get("/api/film/nowshowing").then((res) => res.data);
};

const getListFilmFuture = () => {
  return Api.get("/api/film/commingsoon").then((res) => res.data);
};

const getListFilmToday = () => {
  return Api.get("/api/theater/getfilmtoday").then((res) => res.data)
}

const postBookingInfo = (params) => {
  return Api.post("/api/ticket", params).then((res) => res.data);
};

const getDetail = (params) => {
  return Api.get(`/api/film/${params.id}/detail`).then(res => res.data);
}

const getSeats = (id) => {
  return Api.get(`/api/ticket/schedule_id/${id}`).then(res => res.data)
}

const getComments = (params) => {
  return Api.get(`/api/film_comment?film_id=${params}&limit=1&is_mobile=1`).then(res => res.data)
}

const createComment = (params) => {
  return Api.post(`/api/film_comment`, params).then(res => res.data)
}

const search = () => {
  return Api.get('/api/film_schedule/nowshowing').then(res => res.data)
}

const getTickets = (id_user) => {
  return Api.get(`/api/ticket/detail?customer_id=${id_user}`).then((res) => res.data);
}

const getListFilmNowFavorite = (id_user) => {
  return Api.get(`/api/film/nowshowing?customer_id=${id_user}`).then((res) => res.data);
}


const getListFilmFutureFavorite = (id_user) => {
  return Api.get(`/api/film/commingsoon?customer_id=${id_user}`).then((res) => res.data);
}

const paymentMomo = (params) => {
  return Api.post('/api/payment/momoPayment', params).then(res => res.data)
}

const getTicketDetail = (id_ticket) => {
  // alert(id_ticket)
  return Api.get(`api/ticket/${id_ticket}/detail`).then(res => res.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getListFilmShowing,
  postBookingInfo,
  getDetail,
  getListFilmNow,
  getListFilmFuture,
  getListFilmToday,
  getSeats,
  search,
  getComments,
  createComment,
  getTickets,
  getListFilmFutureFavorite,
  paymentMomo,
  getTicketDetail,
  getListFilmNowFavorite
};
