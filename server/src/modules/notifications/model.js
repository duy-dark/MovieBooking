const mongoose = require('mongoose');

let schema = new mongoose.Schema(
  {
    customer_id: require('mongodb').ObjectID,
    film_id: require('mongodb').ObjectID,
    film_name: require('mongodb').ObjectID,
    date_send: String,
    content: String,
    is_sent: Boolean,
    is_deleted: Boolean,
    created_at: Date,
    updated_at: Date
  },
  {versionKey: false}
);

let Collection = mongoose.model('Notification', schema, 'notifications');

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
