const mongoose = require('mongoose');

let notificationSchema = new mongoose.Schema(
  {
    content: String,
    type: String,
    updated_at: Date,
    is_deleted: Boolean
  },
  {versionKey: false}
);

let Notification = mongoose.model(
  'Notification',
  notificationSchema,
  'notifications'
);

module.exports = {
  findByLamda: async function (lamda) {
    return await Notification.find(lamda);
  },
  createByLamda: async function (lamda) {
    return await Notification.insertMany(lamda);
  },
  updateByLamda: async function (id, lamda) {
    return await Notification.updateOne(id, lamda);
  }
};
