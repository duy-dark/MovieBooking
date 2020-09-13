const mongoose = require('mongoose');

let eventSchema = new mongoose.Schema(
  {
    name: String,
    event_info_id: String,
    updated_at: Date,
    is_deleted: Boolean
  },
  {versionKey: false}
);

let Event = mongoose.model('Event', eventSchema, 'events');

module.exports = {
  findByLambda: async function (lambda) {
    return await Event.find(lambda);
  },
  createByLambda: async function (lambda) {
    return await Event.insertMany(lambda);
  },
  updateByLambda: async function (id, lambda) {
    return await Event.updateOne(id, lambda);
  }
};
