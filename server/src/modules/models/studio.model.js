var mongoose = require('mongoose');

var studioSchema = new mongoose.Schema(
  {
    customer_id: String,
    film_id: String,
    count: int32,
    voucher_id: String,
    seat: Array,
    booking_time: Date,
    cost: int32,
    updated_at: Date,
    is_deleted: Boolean
  },
  {versionKey: false}
);

var Studio = mongoose.model('Studio', studioSchema, 'studios');

module.exports = {
  findByLamda: async function (lamda) {
    var studios = await Studio.find(lamda);
    return studios;
  },
  createByLamda: async function (lamda) {
    await Studio.insertMany(lamda);
  },
  updateByLamda: async function (id, lamda) {
    await Studio.updateOne(id, lamda);
  },
  deleteByLamda: async function (lamda) {
    await Studio.deleteOne(lamda);
  }
};
