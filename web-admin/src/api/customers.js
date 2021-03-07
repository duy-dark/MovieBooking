import Api from "./api";
const Login=(params)=>{
  return Api.post('/api/admin/login',params).then((res) => res.data);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  Login,
};
