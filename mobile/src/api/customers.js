import Api from "./api";

const login = (params) => {
  return Api.post("/api/customer", params).then((res) => res.data);
};

const getUserInfo = (params) => {
  return Api.get(`/api/customer/${params.userID}/detail`).then(
    (res) => res.data
  );
};

const getCategories = () => {
  return Api.get(`api/customer/get_categories`).then((res) => res.data);
}

const postCategories = (params) => {
  return Api.post(`/api/customer/post_categories_favorite`, params).then(
    (res) => res.data
  );
}

export default {
  login,
  getUserInfo,
  getCategories,
  postCategories
};
