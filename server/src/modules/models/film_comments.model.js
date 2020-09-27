const mongoose = require('mongoose');

let filmCommentSchema = new mongoose.Schema(
  {
    film_id: String,
    customer_id: String,
    content: String,
    rate: Number,
    is_deleted: Boolean,
    updated_at: Date
  },
  {versionKey: false}
);

let FilmComment = mongoose.model(
  'FilmComment',
  filmCommentSchema,
  'film_comments'
);

module.exports = {
  findByLamda: async function (lamda) {
    return await FilmComment.find(lamda);
  },
  createByLamda: async function (lamda) {
    return await FilmComment.insertMany(lamda);
  },
  updateByLamda: async function (id, lamda) {
    return await FilmComment.updateOne(id, lamda);
  }
};
