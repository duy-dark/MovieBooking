const mongoose = require('mongoose');
const {getComingSoon} = require('./handler');

let schema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    date_of_birth: Date,
    email: String,
    gender: String,
    avatar: String,
    address: String,
    token_gg: {
      access: String,
      google_id: String
    },
    token_zalo: {
      access: String,
      google_id: String
    },
    is_deleted: Boolean,
    created_at: Date,
    updated_at: Date
  },
  {versionKey: false}
);

let Collection = mongoose.model('Customer', schema, 'customers');

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
