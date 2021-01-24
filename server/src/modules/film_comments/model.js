const mongoose = require('mongoose');

let schema = new mongoose.Schema(
  {
    film_id: require('mongodb').ObjectId,
    customer_id: require('mongodb').ObjectID,
    content: String,
    rate: Number,
    is_deleted: Boolean,
    created_at: Date,
    updated_at: Date
  },
  {versionKey: false}
);

let Collection = mongoose.model('FilmComment', schema, 'film_comments');

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
