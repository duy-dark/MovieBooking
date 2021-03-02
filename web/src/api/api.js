import axios from "axios";
import interceptors from "./interceptors";

const Api = axios.create({
  // baseURL: process.env.REACT_APP_BASE_URL,
  baseURL: 'https://lit-lowlands-21932.herokuapp.com',
  // baseURL: 'https://fb96f5c409d0.ngrok.io',
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

interceptors.setup(Api);
// interceptors.checkToken(Api);
// interceptors.checkError(Api);
// interceptors.showSpinnerRequest(Api);
// interceptors.hideSpinnerRequest(Api);

export default Api;
