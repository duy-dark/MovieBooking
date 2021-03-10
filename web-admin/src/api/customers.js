import Api from "./api";
const Login=(params)=>{
  return Api.post('/api/admin/login',params).then((res) => res.data);
}
const getAdminInfo = (params) => {
  return Api.get(`/api/admin/${params.userID}`).then(
    (res) => res.data
  )
}

const getListCustomers = () => {
  return Api.get('/api/customer/list').then(res => res.data);
}

const updateCustomer = (params) => {
  return Api.put(`/api/customer/bancustomer/${params.id}`, params).then(res => res.data);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  Login,
  getAdminInfo,
  getListCustomers,
  updateCustomer
};
