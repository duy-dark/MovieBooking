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
  findByLambda: async function (lambda) {
    return await TheaterRoom.find(lambda);
  },
  createByLambda: async function (lambda) {
    return await TheaterRoom.insertMany(lambda);
  },
  updateByLambda: async function (id, lambda) {
    return await TheaterRoom.updateOne(id, lambda);
  }
};
