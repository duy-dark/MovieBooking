const mongoose = require('mongoose');

let customerSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    date_of_birth: Date,
    email: String,
    password: String,
    genre: String,
    avatar: String,
    address: String,
    is_deleted: Boolean,
    updated_at: Date,
    token_gg:{
      access: String,
      google_id: String,
    },
  },
  {versionKey: false}
);

let Customer = mongoose.model('Customer', customerSchema, 'customers');

module.exports = {
  findByLambda: async function (lambda) {
    return await Customer.find(lambda);
  },
  createByLambda: async function (lambda) {
    return await Customer.insertMany(lambda);
  },
  updateByLambda: async function (id, lambda) {
    return await Customer.updateOne(id, lambda);
  }
};
