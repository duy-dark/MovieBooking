var mongoose = require('mongoose');

var userSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    date_of_birth: Date,
    email: String,
    password: String,
    permission: String,
    avatar: String,
    adress: String,
    is_deleted: Boolean,
    updated_at: Date
  },
  {versionKey: false}
);

var User = mongoose.model('User', userSchema, 'users');

module.exports = {
  findByLamda: async function (lamda) {
    var users = await User.find(lamda);
    return users;
  },
  createByLamda: async function (lamda) {
    await User.insertMany(lamda);
  },
  updateByLamda: async function (id, lamda) {
    await User.updateOne(id, lamda);
  },
  deleteByLamda: async function (lamda) {
    await User.deleteOne(lamda);
  }
};
