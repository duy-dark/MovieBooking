const mongoose = require('mongoose');

let theaterSchema = new mongoose.Schema(
  {
    name: String,
    address: String,
    url_image: String,
    comment: String,
    is_deleted: Boolean,
    updated_at: Date
  },
  {versionKey: false}
);

let Theater = mongoose.model('Theater', theaterSchema, 'theaters');

module.exports = {
  findByLamda: async function (lamda) {
    return await Theater.find(lamda);
  },
  createByLamda: async function (lamda) {
    return await Theater.insertMany(lamda);
  },
  updateByLamda: async function (id, lamda) {
    return await Theater.updateOne(id, lamda);
  }
};
