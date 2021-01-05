const mongoose = require('mongoose');

let schema = new mongoose.Schema(
  {
    admin_id: require('mongodb').ObjectID,
    permission_id: require('mongodb').ObjectID,
    is_deleted: Boolean,
    created_at: Date,
    updated_at: Date
  },
  {versionKey: false}
);

let Collection = mongoose.model(
  'AdminPermission',
  schema,
  'admins_permissions'
);

module.exports = {
  findByLambda: async function (lambda) {
    lambda = {
      ...lambda,
      is_deleted: false
    };
    return await Collection.find(lambda);
  },
  createByLambda: async function (lambda) {
    return await Collection.insertMany(lambda);
  },
  updateByLambda: async function (id, lambda) {
    return await Collection.updateOne(id, lambda);
  },
  getDetail: async function (lambda) {
    return await Collection.aggregate([
      {
        $lookup: {
          from: 'permissions',
          localField: 'permission_id',
          foreignField: '_id',
          as: 'permisson'
        }
      },
      {
        $lookup: {
          from: 'admins',
          localField: 'admin_id',
          foreignField: '_id',
          as: 'admin'
        }
      },
      {
        $match: {
          permission_id: require('mongodb').ObjectID(lambda._id)
        }
      }
    ]);
  }
};
