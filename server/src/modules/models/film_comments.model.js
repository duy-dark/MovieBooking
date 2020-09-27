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
  findByLambda: async function (lambda) {
    return await FilmComment.find(lambda);
  },
  createByLambda: async function (lambda) {
    return await FilmComment.insertMany(lambda);
  },
  updateByLambda: async function (id, lambda) {
    return await FilmComment.updateOne(id, lambda);
  }
};
