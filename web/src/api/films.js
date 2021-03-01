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
  return Api.get(`/api/film_comment?film_id=${params}`).then(res => res.data)
}

const search = () => {
  return Api.get('/api/film_schedule/nowshowing').then(res => res.data)
}

const paymentMomo = (params) => {
  return Api.post('/api/payment/momoPayment', params).then(res => res.data)
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
  paymentMomo
};
