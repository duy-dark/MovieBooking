var mongoose = require('mongoose');

var newsSchema = new mongoose.Schema(
  {
    content: String,
    hastag: Array,
    public_date: Date,
    is_deleted: Boolean,
    updated_at: Date
  },
  {versionKey: false}
);

var News = mongoose.model('News', newsSchema, 'news');

module.exports = {
  findByLamda: async function (lamda) {
    var news = await News.find(lamda);
    return news;
  },
  createByLamda: async function (lamda) {
    return await News.insertMany(lamda);
  },
  updateByLamda: async function (id, lamda) {
    return await News.updateOne(id, lamda);
  },
  deleteByLamda: async function (lamda) {
    return await News.deleteOne(lamda);
  }
};
