const mongoose = require('mongoose');

let userSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    date_of_birth: Date,
    email: String,
    password: String,
    avatar: String,
    adress: String,
    is_deleted: Boolean,
    updated_at: Date
  },
  {versionKey: false}
);

let User = mongoose.model('User', userSchema, 'users');

module.exports = {
  findByLamda: async function (lamda) {
    return await User.find(lamda);
  },
  createByLamda: async function (lamda) {
    return await User.insertMany(lamda);
  },
  updateByLamda: async function (id, lamda) {
    return await User.updateOne(id, lamda);
  }
};
