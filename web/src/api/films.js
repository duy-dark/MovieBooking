import Api from "./api";

const getListFilmShowing = (params) => {
  return Api.get("/api/film", params).then((res) => res.data);
};

const getListFilmNow = () => {
  return Api.get("/api/film/nowshowing").then((res) => res.data);
};

const getListFilmFuture = () => {
  return Api.get("/api/film/commingson").then((res) => res.data);
};

const postBookingInfo = (params) => {
  return Api.post("api/ticket", params).then((res) => res.data);
};

const getDetail = (params) => {
  return Api.get(`api/film/${params.id}/detail`).then((res) => res.data);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getListFilmShowing,
  postBookingInfo,
  getDetail,
  getListFilmNow,
  getListFilmFuture,
};
