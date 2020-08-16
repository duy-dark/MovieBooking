var mongoose = require('mongoose');

var film_infoSchema = new mongoose.Schema(
  {
    time_start: Date,
    end_time: Date,
    category_ids: Array,
    country_ids: Array,
    price: String,
    is_deleted: Boolean,
    updated_at: Date
  },
  {versionKey: false}
);

var Film_info = mongoose.model('Film_info', film_infoSchema, 'film_infos');

module.exports = {
  findByLamda: async function (lamda) {
    var film_infos = await Film_info.find(lamda);
    return film_infos;
  },
  createByLamda: async function (lamda) {
    await Film_info.insertMany(lamda);
  },
  updateByLamda: async function (id, lamda) {
    await Film_info.updateOne(id, lamda);
  },
  deleteByLamda: async function (lamda) {
    await Film_info.deleteOne(lamda);
  }
};
