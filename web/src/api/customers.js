import Api from "./api";

const login = (params) => {
  return Api.post("/api/customer", params).then((res) => res.data);
};

export default {
  login,
};
