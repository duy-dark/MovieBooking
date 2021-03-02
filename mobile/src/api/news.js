import Api from "./api";

const getListNews = () => {
    return Api.get("/api/news").then((res) => res.data);
};
const getNewsDetails = (id) => {
    return Api.get(`/api/news/${id}`).then(res => res.data);
}
  
export default {
    getListNews,
    getNewsDetails
};