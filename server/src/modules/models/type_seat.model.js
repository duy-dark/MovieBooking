const mongoose = require('mongoose');

let type_seatSchema = new mongoose.Schema(
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

let Type_seat = mongoose.model('Type_seat', type_seatSchema, 'type_seats');

module.exports = {
  findByLambda: async function (lambda) {
    return await Type_seat.find(lambda);
  },
  createByLambda: async function (lambda) {
    return await Type_seat.insertMany(lambda);
  },
  updateByLambda: async function (id, lambda) {
    return await Type_seat.updateOne(id, lambda);
  }
};
