import Api from "./api";

const getListCinemas = () => {
    return Api.get("/api/theater").then((res) => res.data);
};
const getCinemaDetails = (id) => {
    return Api.get(`/api/theater/${id}/detail`).then(res => res.data);
}
  
export default {
    getListCinemas,
    getCinemaDetails,
};