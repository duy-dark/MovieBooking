const mongoose = require('mongoose');

let theaterRoomSchema = new mongoose.Schema(
  {
    theater_id: String,
    name: String,
    count_of_seat: Number,
    seat_ids: Array,
    type_room: String,
    is_deleted: Boolean,
    updated_at: Date
  },
  {versionKey: false}
);

let TheaterRoom = mongoose.model(
  'theaterRoom',
  theaterRoomSchema,
  'theater_rooms'
);

module.exports = {
  findByLamda: async function (lamda) {
    return await TheaterRoom.find(lamda);
  },
  createByLamda: async function (lamda) {
    return await TheaterRoom.insertMany(lamda);
  },
  updateByLamda: async function (id, lamda) {
    return await TheaterRoom.updateOne(id, lamda);
  }
};
