var mongoose = require('mongoose');

var type_seatSchema = new mongoose.Schema(
  {
    room_id: String,
    seats: Array,
    column: int32,
    rows: int32,
    updated_at: Date,
    is_deleted: Boolean
  },
  {versionKey: false}
);

var Type_seat = mongoose.model('Type_seat', type_seatSchema, 'type_seats');

module.exports = {
  findByLamda: async function (lamda) {
    var type_seats = await Type_seat.find(lamda);
    return type_seats;
  },
  createByLamda: async function (lamda) {
    return await Type_seat.insertMany(lamda);
  },
  updateByLamda: async function (id, lamda) {
    return await Type_seat.updateOne(id, lamda);
  },
  deleteByLamda: async function (lamda) {
    return await Type_seat.deleteOne(lamda);
  }
};
