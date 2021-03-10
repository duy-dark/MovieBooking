const mongoose = require('mongoose');

let schema = new mongoose.Schema(
  {
    customer_id: require('mongodb').ObjectID,
    type: Number,
    coupons_status: Number,
    is_deleted: Boolean,
    created_at: Date,
    updated_at: Date
  },
  {versionKey: false}
);

let Collection = mongoose.model('Coupons', schema, 'coupons');

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
  getDetail: async function (lambda) {
    return await Collection.aggregate([
      {
        $match: {
          $and: [lambda.conditions]
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
        $addFields: {
          customers: {
            $map: {
              input: '$customers',
              in: {
                _id: '$$this._id',
                name: '$$this.name',
                point: '$$this.point'
              }
            }
          }
        }
      },
      {
        $unwind: {
          path: '$customers',
          preserveNullAndEmptyArrays: true
        }
      },
      {$sort: {created_at: -1}}
    ]);
  },

  getDetailCustomer: async function (lambda) {
    return await Collection.aggregate([
      {
        $match: {
          $and: [lambda.conditions]
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
        $addFields: {
          customers: {
            $map: {
              input: '$customers',
              in: {
                _id: '$$this._id',
                name: '$$this.name',
                point: '$$this.point'
              }
            }
          }
        }
      },
      {
        $unwind: {
          path: '$customers',
          preserveNullAndEmptyArrays: true
        }
      },
      {$sort: {created_at: -1}}
    ]);
  }
};
