const mongoose = require('mongoose');

let schema = new mongoose.Schema(
  {
    theater_id: String,
    name: String,
    count_of_seat: Number,
    seat_ids: Array,
    type_room: String,
    is_deleted: Boolean,
    created_at: Date,
    updated_at: Date
  },
  {versionKey: false}
);

let Collection = mongoose.model('TheaterRoom', schema, 'theater_rooms');

module.exports = {
  findByLambda: async function (lambda) {
    lambda = {
      ...lambda,
      is_deleted: false
    };
    return await Collection.find(lambda);
  },
  createByLambda: async function (lambda) {
    return await Collection.insertMany(lambda);
  },
  updateByLambda: async function (id, lambda) {
    return await Collection.updateOne(id, lambda);
  }
};
