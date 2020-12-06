const mongoose = require('mongoose');
// validator no insert row when table has had theater_id and time_start
let userPermissionSchema = new mongoose.Schema(
  {
    user_id: require('mongodb').ObjectID,
    permission_id: String,
    is_deleted: Boolean,
    updated_at: Date
  },
  {versionKey: false}
);

let UserPermissions = mongoose.model(
  'UserPermissions',
  permissionSchema,
  'user_permissions'
);

module.exports = {
  findByLambda: async function (lambda) {
    return await UserPermissions.find(lambda);
  },
  createByLambda: async function (lambda) {
    return await UserPermissions.insertMany(lambda);
  },
  updateByLambda: async function (id, lambda) {
    return await UserPermissions.updateOne(id, lambda);
  }
};
