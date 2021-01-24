const mongoose = require('mongoose');

let schema = new mongoose.Schema(
  {
    code: String,
    discount: Number,
    discount_percent: Number,
    event_id: require('mongodb').ObjectID,
    is_deleted: Boolean,
    created_at: Date,
    updated_at: Date
  },
  {versionKey: false}
);

let Collection = mongoose.model('Voucher', schema, 'vouchers');

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
