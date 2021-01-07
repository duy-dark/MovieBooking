const mongoose = require('mongoose');

let schema = new mongoose.Schema(
  {
    name: String,
    count_of_seat: Number,
    type_room: String,
    theater_id: require('mongodb').ObjectID,
    seat_ids: [require('mongodb').ObjectID],
    is_deleted: Boolean,
    created_at: Date,
    updated_at: Date
  },
  {versionKey: false}
);

let Collection = mongoose.model('TheaterRoom', schema, 'theater_rooms');

module.exports = {
  findByLambda: async function (lambda) {
    return await Collection.find(lambda.conditions, lambda.views);
  },
  createByLambda: async function (lambda) {
    return await Collection.insertMany(lambda);
  },
  updateByLambda: async function (lambda) {
    return await Collection.updateOne(lambda.conditions, lambda.params);
  }
};
