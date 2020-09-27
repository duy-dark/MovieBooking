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
  findByLambda: async function (lambda) {
    return await Event_info.find(lambda);
  },
  createByLambda: async function (lambda) {
    return await Event_info.insertMany(lambda);
  },
  updateByLambda: async function (id, lambda) {
    return await Event_info.updateOne(id, lambda);
  }
};
