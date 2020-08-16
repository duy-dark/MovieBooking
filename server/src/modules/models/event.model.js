var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema(
  {
    name: String,
    event_info_id: String,
    updated_at: Date,
    is_deleted: Boolean
  },
  {versionKey: false}
);

var Event = mongoose.model('Event', eventSchema, 'events');

module.exports = {
  findByLamda: async function (lamda) {
    var events = await Event.find(lamda);
    return events;
  },
  createByLamda: async function (lamda) {
    await Event.insertMany(lamda);
  },
  updateByLamda: async function (id, lamda) {
    await Event.updateOne(id, lamda);
  },
  deleteByLamda: async function (lamda) {
    await Event.deleteOne(lamda);
  }
};
