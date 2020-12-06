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
  findByLambda: async function (lambda) {
    return await Notification.find(lambda);
  },
  createByLambda: async function (lambda) {
    return await Notification.insertMany(lambda);
  },
  updateByLambda: async function (id, lambda) {
    return await Notification.updateOne(id, lambda);
  }
};
