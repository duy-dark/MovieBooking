var mongoose = require('mongoose');

var seat_detailSchema = new mongoose.Schema(
  {
    type: String,
    status: int32,
    position: Array,
    updated_at: Date,
    is_deleted: Boolean
  },
  {versionKey: false}
);

var Seat_detail = mongoose.model(
  'Seat_detail',
  seat_detailSchema,
  'seat_details'
);

module.exports = {
  findByLamda: async function (lamda) {
    var seat_details = await Seat_detail.find(lamda);
    return seat_details;
  },
  createByLamda: async function (lamda) {
    await Seat_detail.insertMany(lamda);
  },
  updateByLamda: async function (id, lamda) {
    await Seat_detail.updateOne(id, lamda);
  },
  deleteByLamda: async function (lamda) {
    await Seat_detail.deleteOne(lamda);
  }
};
