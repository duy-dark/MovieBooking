const mongoose = require('mongoose');

let schema = new mongoose.Schema(
  {
    customer_id: require('mongodb').ObjectID,
    film_id: require('mongodb').ObjectID,
    film_name: String,
    film_avatar: String,
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
  },
  updateManyByLambda: async function (lambda) {
    return await Collection.updateMany(lambda.conditions, lambda.params);
  },

  getByCustomerID: async function (lambda) {
    return await Collection.aggregate([
      {
        $match: {
          $and: [lambda.conditions]
        }
      },
      {$sort: {created_at: -1}}
    ]);
  }
};
