import Api from "./api";


const updateFilmDetail = (params,data)=>{
  return Api.put(`api/film/${params.id}`,data).then((res) => res.data);
}
const getListFilmNow = () => {
  return Api.get("/api/film").then((res) => res.data);
};

const getListFilmFuture = () => {
  return Api.get("/api/film/commingsoon").then((res) => res.data);
};

const getListFilmToday = () => {
  return Api.get("/api/theater/getfilmtoday").then((res) => res.data)
}

const postBookingInfo = (params) => {
  return Api.post("api/ticket", params).then((res) => res.data);
};

const getDetail = (params) => {
  return Api.get(`api/film/${params.id}/detail`).then(res => res.data);
}

const getSeats = (id) => {
  return Api.get(`api/ticket/ticket/${id}`).then(res => res.data)
}

const getCategories = ()=>{
  return Api.get(`api/category`).then((res) => res.data)
}

const addNewFilm= (params) =>{
  return Api.post(`api/film`,params).then((res) => res.data)
}

const getFilmSchedule = (params)=>{
  return Api.get(`api/film_schedule?film_id=${params}`).then((res) => res.data)
}

const uploadFile = (file)=>{
  let formData = new FormData();
  formData.append('file', file)
  
  return Api.post(
    '/api/file/upload',
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  ).then(res => res.data)
}

const createNewPaper = (params) => {
  return Api.post('/api/news/', params).then((res) => res.data)
}

const getListNewpapers = (params) => {
  return Api.get('').then((res) => res.data)
}


// eslint-disable-next-line import/no-anonymous-default-export
const getTheater = ()=>{
  return Api.get(`api/theater`).then((res)=>res.data)
}
export default {
  
  postBookingInfo,
  getDetail,
  getListFilmNow,
  getListFilmFuture,
  getListFilmToday,
  getSeats,
  updateFilmDetail,
  getCategories,
  addNewFilm,
  getFilmSchedule,
  getTheater,
  uploadFile,
  createNewPaper,
  getListNewpapers
};
