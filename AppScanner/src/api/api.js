import axios from "axios";
// import interceptors from "./interceptors";

const Api = axios.create({
  baseURL: 'https://servermoviebooking.herokuapp.com',
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// interceptors.setup(Api);
// interceptors.checkToken(Api);
// interceptors.checkError(Api);
// interceptors.showSpinnerRequest(Api);
// interceptors.hideSpinnerRequest(Api);

export default Api;
