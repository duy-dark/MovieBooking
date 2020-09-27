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
  findByLamda: async function (lamda) {
    return await Film.find(lamda);
  },
  createByLamda: async function (lamda) {
    return await Film.insertMany(lamda);
  },
  updateByLamda: async function (id, lamda) {
    return await Film.updateOne(id, lamda);
  }
};
