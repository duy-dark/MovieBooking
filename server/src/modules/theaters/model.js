const mongoose = require('mongoose');

let schema = new mongoose.Schema(
  {
    name: String,
    address: String,
    url_image: String,
    comment: String,
    room_ids: [require('mongodb').ObjectID],
    is_deleted: Boolean,
    created_at: Date,
    updated_at: Date
  },
  {versionKey: false}
);

let Collection = mongoose.model('Theater', schema, 'theaters');

module.exports = {
  findByLambda: async function (lambda) {
<<<<<<< HEAD
    lambda = {
      ...lambda,
      is_deleted: false
    };
    return await Collection.find(lambda);
  },
  findByIdLambda: async function (lambda) {
    return await Theater.find({_id: new ObjectId(lambda)});
=======
    return await Collection.find(lambda.conditions, lambda.views);
>>>>>>> 60a95bf598a70b06a1e2ea6c8d4da7ca4f5ade5b
  },
  createByLambda: async function (lambda) {
    return await Collection.insertMany(lambda);
  },
  updateByLambda: async function (lambda) {
    return await Collection.updateOne(lambda.conditions, lambda.params);
  }
};
