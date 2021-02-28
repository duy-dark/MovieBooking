import axios from "axios";
import interceptors from "./interceptors";

const Api = axios.create({
  baseURL: "https://0a5c09ed79fc.ngrok.io",
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
