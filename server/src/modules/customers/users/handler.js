// viết function xử lý tại
const modelCustomer = require('./../../models/customer.model')
const insertUser = (user) => {
  return modelCustomer.createByLamda(user)
}

const register = async (user) => {};

module.exports = {
  insertUser,
  register
};
