var mongoose = require('mongoose');

var filmSchema = new mongoose.Schema(
  {
    name: String,
    film_info_id: String,
    theater_id: Array,
    comment: Array,
    is_deleted: Boolean,
    updated_at: Date
  },
  {versionKey: false}
);

var Film = mongoose.model('Film', filmSchema, 'films');

module.exports = {
  findByLamda: async function (lamda) {
    var films = await Film.find(lamda);
    return films;
  },
  createByLamda: async function (lamda) {
    await Film.insertMany(lamda);
  },
  updateByLamda: async function (id, lamda) {
    await Film.updateOne(id, lamda);
  },
  deleteByLamda: async function (lamda) {
    await Film.deleteOne(lamda);
  }
};
