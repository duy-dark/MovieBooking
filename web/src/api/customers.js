import Api from "./api";

const loginFacebook = (params) => {
  return Api.post("/login/facebook/auth", { params }).then((res) => {
    return res.data;
  });
};

const loginZalo = (params) => {
  return Api.post("/login/Zalo/auth", { params }).then((res) => {
    return res.data;
  });
};

const loginGoogle = (params) => {
  return Api.post("/login/Google/auth", { params }).then((res) => {
    return res.data;
  });
};

const login = (params) => {
  return {
    user: {
      username: "duy12541",
      password: "duy12541",
    },
    token: "ághasfhlashfhafphapsfhafh",
  };
};

export default {
  loginFacebook,
  loginZalo,
  loginGoogle,
  login,
};
