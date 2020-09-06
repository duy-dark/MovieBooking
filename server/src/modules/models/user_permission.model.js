const mongoose = require('mongoose');
// validator no insert row when table has had theater_id and time_start
let userPermissionSchema = new mongoose.Schema(
  {
    user_id: String,
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
  findByLamda: async function (lamda) {
    return await UserPermissions.find(lamda);
  },
  createByLamda: async function (lamda) {
    return await UserPermissions.insertMany(lamda);
  },
  updateByLamda: async function (id, lamda) {
    return await UserPermissions.updateOne(id, lamda);
  }
};
