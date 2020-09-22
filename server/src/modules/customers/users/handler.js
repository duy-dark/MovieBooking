// viết function xử lý tại
const modelCustomer = require('./../../models/customer.model')
const modelToken = require('./../../models/token.model')
const insertUser = (user) => {
  return modelCustomer.createByLamda(user)
}

const insertToken = (token) => {
  return modelToken.createByLamda(token)
}

const register = async (user) => {};

module.exports = {
  insertUser,
  register,
  insertToken
};
