var mongoose = require('mongoose');

var event_infoSchema = new mongoose.Schema(
  {
    name: String,
    content: String,
    updated_at: Date,
    is_deleted: Boolean
  },
  {versionKey: false}
);

var Event_info = mongoose.model('Event_info', event_infoSchema, 'event_infos');

module.exports = {
  findByLamda: async function (lamda) {
    var event_infos = await Event_info.find(lamda);
    return event_infos;
  },
  createByLamda: async function (lamda) {
    await Event_info.insertMany(lamda);
  },
  updateByLamda: async function (id, lamda) {
    await Event_info.updateOne(id, lamda);
  },
  deleteByLamda: async function (lamda) {
    await Event_info.deleteOne(lamda);
  }
};
