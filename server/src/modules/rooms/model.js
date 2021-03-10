const mongoose = require('mongoose');

let schema = new mongoose.Schema(
  {
    name: String,
    count_of_seat: Number,
    type: String,
    theater_id: require('mongodb').ObjectID,
    seats: Array,
    is_deleted: Boolean,
    created_at: Date,
    updated_at: Date
  },
  {versionKey: false}
);

let Collection = mongoose.model('Room', schema, 'rooms');

module.exports = {
  findByLambda: async function (lambda) {
    return await Collection.find(lambda.conditions, lambda.views);
  },
  createByLambda: async function (lambda) {
    return await Collection.insertMany(lambda);
  },
  updateByLambda: async function (lambda) {
    return await Collection.updateOne(lambda.conditions, lambda.params);
  },
  updateManyByLambda: async function (lambda) {
    return await Collection.updateMany(lambda.conditions, lambda.params);
  }
};
