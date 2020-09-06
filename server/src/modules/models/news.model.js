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
  findByLamda: async function (lamda) {
    return await News.find(lamda);
  },
  createByLamda: async function (lamda) {
    return await News.insertMany(lamda);
  },
  updateByLamda: async function (id, lamda) {
    return await News.updateOne(id, lamda);
  }
};
