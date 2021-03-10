import Api from "./api";

const login = (params) => {
  return Api.post("/api/customer", params).then((res) => res.data);
};

const getUserInfo = (params) => {
  return Api.get(`/api/customer/${params.userID}/detail`).then(
    (res) => res.data
  );
};

const getTicketsInfo = (params) => {
  return Api.get(`api/ticket/detail?customer_id=${params.userID||params._id}&limit=${params.limit}`).then(
    (res) => res.data
  );
};

export default {
  login,
  getUserInfo,
  getTicketsInfo
};
