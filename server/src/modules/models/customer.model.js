var mongoose = require('mongoose');

var customerSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    date_of_birth: Date,
    email: String,
    password: String,
    type: String,
    avatar: String,
    adress: String,
    is_deleted: Boolean,
    updated_at: Date
  },
  {versionKey: false}
);

var Customer = mongoose.model('Customer', customerSchema, 'customers');

module.exports = {
  findByLamda: async function (lamda) {
    var customers = await Customer.find(lamda);
    return customers;
  },
  createByLamda: async function (lamda) {
    await Customer.insertMany(lamda);
  },
  updateByLamda: async function (id, lamda) {
    await Customer.updateOne(id, lamda);
  },
  deleteByLamda: async function (lamda) {
    await Customer.deleteOne(lamda);
  }
};
