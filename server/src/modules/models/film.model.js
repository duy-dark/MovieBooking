const mongoose = require('mongoose');

let filmSchema = new mongoose.Schema(
  {
    name: String,
    content: String,
    countries: String,
    long_time: String,
    start_date: Date,
    directors: String,
    rates: Number,
    rate_count: Number,
    actors: String,
    digitals: String,
    is_deleted: Boolean,
    updated_at: Date
  },
  {versionKey: false}
);

let Film = mongoose.model('Film', filmSchema, 'films');

module.exports = {
  findByLambda: async function (lambda) {
    return await Film.find(lambda);
  },
  createByLambda: async function (lambda) {
    return await Film.insertMany(lambda);
  },
  updateByLambda: async function (id, lambda) {
    return await Film.updateOne(id, lambda);
  }
};
