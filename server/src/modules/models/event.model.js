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
  findByLamda: async function (lamda) {
    return await Event.find(lamda);
  },
  createByLamda: async function (lamda) {
    return await Event.insertMany(lamda);
  },
  updateByLamda: async function (id, lamda) {
    return await Event.updateOne(id, lamda);
  }
};
