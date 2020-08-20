var mongoose = require('mongoose');

var ticket_queueSchema = new mongoose.Schema(
  {
    room_id: String,
    seat_detail_id: String,
    updated_at: Date,
    is_deleted: Boolean
  },
  {versionKey: false}
);

var Ticket_queue = mongoose.model(
  'Ticket_queue',
  ticket_queueSchema,
  'ticket_queues'
);

module.exports = {
  findByLamda: async function (lamda) {
    var ticket_queues = await Ticket_queue.find(lamda);
    return ticket_queues;
  },
  createByLamda: async function (lamda) {
    return await Ticket_queue.insertMany(lamda);
  },
  updateByLamda: async function (id, lamda) {
    return await Ticket_queue.updateOne(id, lamda);
  },
  deleteByLamda: async function (lamda) {
    return await Ticket_queue.deleteOne(lamda);
  }
};
