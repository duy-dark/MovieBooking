const mongoose = require('mongoose');
// validator no insert row when table has had theater_id and time_start
let permissionSchema = new mongoose.Schema(
  {
    name: String,
    conntent: String,
    is_deleted: Boolean,
    updated_at: Date
  },
  {versionKey: false}
);

let Permissions = mongoose.model(
  'Permissions',
  permissionSchema,
  'permissions'
);

module.exports = {
  findByLamda: async function (lamda) {
    return await Permissions.find(lamda);
  },
  createByLamda: async function (lamda) {
    return await Permissions.insertMany(lamda);
  },
  updateByLamda: async function (id, lamda) {
    return await Permissions.updateOne(id, lamda);
  }
};
