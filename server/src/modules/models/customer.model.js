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
    updated_at: Date
  },
  {versionKey: false}
);

let Customer = mongoose.model('Customer', customerSchema, 'customers');

module.exports = {
  findByLamda: async function (lamda) {
    return await Customer.find(lamda);
  },
  createByLamda: async function (lamda) {
    return await Customer.insertMany(lamda);
  },
  updateByLamda: async function (id, lamda) {
    return await Customer.updateOne(id, lamda);
  }
};
