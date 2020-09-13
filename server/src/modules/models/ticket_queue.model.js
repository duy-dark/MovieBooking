const mongoose = require('mongoose');

let ticket_queueSchema = new mongoose.Schema(
  {
    room_id: String,
    seat_detail_id: String,
    updated_at: Date,
    is_deleted: Boolean
  },
  {versionKey: false}
);

let Ticket_queue = mongoose.model(
  'Ticket_queue',
  ticket_queueSchema,
  'ticket_queues'
);

module.exports = {
  findByLambda: async function (lambda) {
    return await Ticket_queue.find(lambda);
  },
  createByLambda: async function (lambda) {
    return await Ticket_queue.insertMany(lambda);
  },
  updateByLambda: async function (id, lambda) {
    return await Ticket_queue.updateOne(id, lambda);
  }
};
