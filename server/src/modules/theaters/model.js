const mongoose = require('mongoose');
<<<<<<< HEAD:server/src/modules/models/theater.model.js
const ObjectId = require('mongodb').ObjectID;
let theaterSchema = new mongoose.Schema(
=======

let schema = new mongoose.Schema(
>>>>>>> 1f6a5242df4af75e52667a47df0e396f75d4f1c1:server/src/modules/theaters/model.js
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
    return await Theater.find({"_id": new ObjectId(lambda)});
  },
  createByLambda: async function (lambda) {
    return await Collection.insertMany(lambda);
  },
  updateByLambda: async function (id, lambda) {
    return await Collection.updateOne(id, lambda);
  }
};