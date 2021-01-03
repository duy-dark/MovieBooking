const mongoose = require('mongoose');

let schema = new mongoose.Schema(
  {
    name: String,
    address: String,
    url_image: String,
    comment: String,
    is_deleted: Boolean,
    created_at: Date,
    updated_at: Date
  },
  {versionKey: false}
);

let Collection = mongoose.model('Theater', schema, 'theaters');

module.exports = {
  findByLambda: async function (lambda) {
    lambda = {
      ...lambda,
      is_deleted: false
    };
    return await Collection.find(lambda);
  },
  findByIdLambda: async function (lambda) {
    return await Collection.find({_id: new ObjectId(lambda)});
  },
  createByLambda: async function (lambda) {
    return await Collection.insertMany(lambda);
  },
  updateByLambda: async function (id, lambda) {
    return await Collection.updateOne(id, lambda);
  }
};
