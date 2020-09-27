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
  findByLamda: async function (lamda) {
    return await FilmCategory.find(lamda);
  },
  createByLamda: async function (lamda) {
    return await FilmCategory.insertMany(lamda);
  },
  updateByLamda: async function (id, lamda) {
    return await FilmCategory.updateOne(id, lamda);
  }
};
