const mongoose = require('mongoose');

let schema = new mongoose.Schema(
  {
    customers: [Object],
    content_web: String,
    content_mobile: String,
    content_mail: String,
    content_sms: String,
    type: String,
    is_deleted: Boolean,
    created_at: Date,
    updated_at: Date
  },
  {versionKey: false}
);

let Collection = mongoose.model('Noti_sendmails', schema, 'noti_sendmails');

module.exports = {
  findByLambda: async function (lambda) {
    return await Collection.find(lambda.conditions, lambda.views);
  },
  createByLambda: async function (lambda) {
    return await Collection.insertMany(lambda);
  },
  updateByLambda: async function (lambda) {
    return await Collection.updateOne(lambda.conditions, lambda.params);
  }
};
