const mongoose = require('mongoose');

let schema = new mongoose.Schema(
  {
    film_id: require('mongodb').ObjectId,
    customer_id: require('mongodb').ObjectID,
    rate: Object,
    is_deleted: Boolean,
    created_at: Date,
    updated_at: Date
  },
  {versionKey: false}
);

let Collection = mongoose.model('FilmRate', schema, 'film_rates');

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
  findByLambda_detail: async function (lambda) {
    console.log('lambda:', lambda);

    return await Collection.aggregate([
      {
        $match: {
          $and: [lambda]
        }
      },
      {
        $lookup: {
          from: 'customers',
          localField: 'customer_id',
          foreignField: '_id',
          as: 'customers'
        }
      },
      {
        $unwind: {
          path: '$customers',
          preserveNullAndEmptyArrays: true
        }
      }
    ]);
  }
};
