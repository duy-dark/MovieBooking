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
  findByLambda: async function (lambda) {
    return await Theater.find(lambda);
  },
  createByLambda: async function (lambda) {
    return await Theater.insertMany(lambda);
  },
  updateByLambda: async function (id, lambda) {
    return await Theater.updateOne(id, lambda);
  }
};
