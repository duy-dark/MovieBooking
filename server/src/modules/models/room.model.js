var mongoose = require('mongoose');

var roomSchema = new mongoose.Schema(
  {
    theater_id: String,
    name: String,
    status: String,
    count_of_seat: int32,
    seat_ids: String,
    type_room: String,
    is_deleted: Boolean,
    updated_at: Date
  },
  {versionKey: false}
);

var Room = mongoose.model('Room', roomSchema, 'rooms');

module.exports = {
  findByLamda: async function (lamda) {
    var rooms = await Room.find(lamda);
    return rooms;
  },
  createByLamda: async function (lamda) {
    await Room.insertMany(lamda);
  },
  updateByLamda: async function (id, lamda) {
    await Room.updateOne(id, lamda);
  },
  deleteByLamda: async function (lamda) {
    await Room.deleteOne(lamda);
  }
};
