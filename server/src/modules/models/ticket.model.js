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
  findByLambda: async function (lambda) {
    return await Ticket.find(lambda);
  },
  createByLambda: async function (lambda) {
    return await Ticket.insertMany(lambda);
  },
  updateByLambda: async function (id, lambda) {
    return await Ticket.updateOne(id, lambda);
  }
};
