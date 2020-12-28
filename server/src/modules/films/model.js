const mongoose = require('mongoose');
const {getComingSoon} = require('./handler');

let schema = new mongoose.Schema(
  {
    name: String,
    content: String,
    countries: String,
    long_time: String,
    start_date: Date,
    directors: String,
    actors: String,
    digitals: String,
    is_deleted: Boolean,
    updated_at: Date
  },
  {versionKey: false}
);

let Collection = mongoose.model('Film', schema, 'films');

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
