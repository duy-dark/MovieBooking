const mongoose = require('mongoose');

let ticketSchema = new mongoose.Schema(
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

let Ticket = mongoose.model('Ticket', ticketSchema, 'tickets');

module.exports = {
  findByLamda: async function (lamda) {
    return await Ticket.find(lamda);
  },
  createByLamda: async function (lamda) {
    return await Ticket.insertMany(lamda);
  },
  updateByLamda: async function (id, lamda) {
    return await Ticket.updateOne(id, lamda);
  }
};
