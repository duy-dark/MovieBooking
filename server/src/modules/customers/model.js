const mongoose = require('mongoose');

let schema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    date_of_birth: Date,
    account_type: String,
    facebook_id: String,
    google_id: String,
    email: String,
    gender: String,
    avatar: String,
    address: String,
    favorite_ids: [require('mongodb').ObjectID],
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
  },
  getDetail: async function (lambda) {
    return await Collection.aggregate([
      {
        $match: {
          $and: [lambda.conditions]
        }
      },
      {
        $unwind: {
          path: '$favorite_ids',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'categories',
          let: {
            category_id: '$favorite_ids',
            is_deleted: false
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: ['$_id', '$$category_id']
                    },
                    {
                      $eq: ['$is_deleted', '$$is_deleted']
                    }
                  ]
                }
              }
            }
          ],
          as: 'categories'
        }
      },
      {
        $unwind: {
          path: '$categories',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $group: {
          _id: '$_id',
          favorite_ids: {
            $push: '$favorite_ids'
          },
          facebook_id: {
            $first: '$facebook_id'
          },
          name: {
            $first: '$name'
          },
          email: {
            $first: '$email'
          },
          avatar: {
            $first: '$avatar'
          },
          created_at: {
            $first: '$created_at'
          },
          updated_at: {
            $first: '$updated_at'
          },
          categories: {
            $push: '$categories'
          }
        }
      }
    ]);
  },

  getByFavorite: async function (favorite_ids) {
    return await Collection.aggregate([
      {
        $match: {
          $and: [
            {is_deleted: false},
            {
              favorite_ids: {
                $in: favorite_ids
              }
            }
          ]
        }
      }
    ]);
  }
};
