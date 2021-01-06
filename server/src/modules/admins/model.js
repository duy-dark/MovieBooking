const mongoose = require('mongoose');

let schema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    date_of_birth: Date,
    email: String,
    password: String,
    avatar: String,
    adress: String,
    permission_id: [require('mongodb').ObjectID],
    is_deleted: Boolean,
    created_at: Date,
    updated_at: Date
  },
  {versionKey: false}
);

let Collection = mongoose.model('Admin', schema, 'admins');

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
    console.log('lambda1111: ', lambda);
    return await Collection.aggregate([
      {$match: lambda.conditions},
      {
        $lookup: {
          from: 'permissions',
          localField: 'permission_id',
          foreignField: '_id',
          as: 'permissions'
        }
      },
      {
        $addFields: {
          permissions: {
            $map: {
              input: '$permissions',
              in: {name: '$$this.name', content: '$$this.content'}
            }
          }
        }
      },
      {
        $project: lambda.views
      }
    ]);
  }
};
