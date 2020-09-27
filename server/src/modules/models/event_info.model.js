const mongoose = require('mongoose');

let event_infoSchema = new mongoose.Schema(
  {
    name: String,
    content: String,
    updated_at: Date,
    is_deleted: Boolean
  },
  {versionKey: false}
);

let Event_info = mongoose.model('Event_info', event_infoSchema, 'event_infos');

module.exports = {
  findByLamda: async function (lamda) {
    return await Event_info.find(lamda);
  },
  createByLamda: async function (lamda) {
    return await Event_info.insertMany(lamda);
  },
  updateByLamda: async function (id, lamda) {
    return await Event_info.updateOne(id, lamda);
  }
};
