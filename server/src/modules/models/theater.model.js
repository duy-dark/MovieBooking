var mongoose = require('mongoose');

var theaterSchema = new mongoose.Schema(
  {
    name: String,
    address: String,
    count_of_room: int32,
    studio_id: String,
    url_image: String,
    comment: String,
    is_deleted: Boolean,
    updated_at: Date
  },
  {versionKey: false}
);

var Theater = mongoose.model('Theater', theaterSchema, 'theaters');

module.exports = {
  findByLamda: async function (lamda) {
    var theaters = await Theater.find(lamda);
    return theaters;
  },
  createByLamda: async function (lamda) {
    await Theater.insertMany(lamda);
  },
  updateByLamda: async function (id, lamda) {
    await Theater.updateOne(id, lamda);
  },
  deleteByLamda: async function (lamda) {
    await Theater.deleteOne(lamda);
  }
};
