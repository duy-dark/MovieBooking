import axios from "axios";
import interceptors from "./interceptors";

const Api = axios.create({
  // baseURL: process.env.REACT_APP_BASE_URL,
  baseURL: 'https://7ca3e2f41320.ngrok.io',
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
