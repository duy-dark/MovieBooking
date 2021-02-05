import axios from "axios";
import Api from "./api";

const getListFilmShowing = (params) => {
  return Api.get("/api/film", params).then((res) => res.data);
};

const getListFilmNow = () => {
  return Api.get("/api/film/nowshowing").then((res) => res.data);
};

const getListFilmFuture = () => {
  // return axios.get("https://127.0.0.1:1000/api/film/commingsoon").then(res => res.data)
  return Api.get("/api/film/commingsoon").then((res) => res.data);
};

const getListFilmToday = () => {
  return Api.get("/api/theater/getfilmtoday").then((res) => res.data)
}

const postBookingInfo = (params) => {
  return Api.post("api/ticket", params).then((res) => res.data);
};

const getDetail = (params) => {
  return Api.get(`api/film/${params.id}/detail`).then(res => res.data);
}

const getSeats = (id) => {
  return Api.get(`api/ticket/ticket/${id}`).then(res => res.data)
}
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getListFilmShowing,
  postBookingInfo,
  getDetail,
  getListFilmNow,
  getListFilmFuture,
  getListFilmToday,
  getSeats
};
