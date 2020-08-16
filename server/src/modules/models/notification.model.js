var mongoose = require('mongoose');

var notificationSchema = new mongoose.Schema(
  {
    content: String,
    type: String,
    updated_at: Date,
    is_deleted: Boolean
  },
  {versionKey: false}
);

var Notification = mongoose.model(
  'Notification',
  notificationSchema,
  'notifications'
);

module.exports = {
  findByLamda: async function (lamda) {
    var notifications = await Notification.find(lamda);
    return notifications;
  },
  createByLamda: async function (lamda) {
    await Notification.insertMany(lamda);
  },
  updateByLamda: async function (id, lamda) {
    await Notification.updateOne(id, lamda);
  },
  deleteByLamda: async function (lamda) {
    await Notification.deleteOne(lamda);
  }
};
