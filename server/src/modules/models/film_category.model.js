const mongoose = require('mongoose');

let filmCategorySchema = new mongoose.Schema(
  {
    film_id: String,
    category_id: String,
    is_deleted: Boolean,
    updated_at: Date
  },
  {versionKey: false}
);
let FilmCategory = mongoose.model(
  'FilmCategory',
  filmCategorySchema,
  'film_category'
);

module.exports = {
  findByLambda: async function (lambda) {
    return await FilmCategory.find(lambda);
  },
  createByLambda: async function (lambda) {
    return await FilmCategory.insertMany(lambda);
  },
  updateByLambda: async function (id, lambda) {
    return await FilmCategory.updateOne(id, lambda);
  }
};
