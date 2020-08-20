var mongoose = require('mongoose');

var ticketSchema = new mongoose.Schema(
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

var Ticket = mongoose.model('Ticket', ticketSchema, 'tickets');

module.exports = {
  findByLamda: async function (lamda) {
    var tickets = await Ticket.find(lamda);
    return tickets;
  },
  createByLamda: async function (lamda) {
    return await Ticket.insertMany(lamda);
  },
  updateByLamda: async function (id, lamda) {
    return await Ticket.updateOne(id, lamda);
  },
  deleteByLamda: async function (lamda) {
    return await Ticket.deleteOne(lamda);
  }
};
