const mongoose = require('mongoose');

let newsSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    hastag: Array,
    public_date: Date,
    film_id: String,
    is_deleted: Boolean,
    updated_at: Date
  },
  {versionKey: false}
);

let News = mongoose.model('News', newsSchema, 'news');

module.exports = {
  findByLambda: async function (lambda) {
    return await News.find(lambda);
  },
  createByLambda: async function (lambda) {
    return await News.insertMany(lambda);
  },
  updateByLambda: async function (id, lambda) {
    return await News.updateOne(id, lambda);
  }
};
