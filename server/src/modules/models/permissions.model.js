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
  findByLambda: async function (lambda) {
    return await Permissions.find(lambda);
  },
  createByLambda: async function (lambda) {
    return await Permissions.insertMany(lambda);
  },
  updateByLambda: async function (id, lambda) {
    return await Permissions.updateOne(id, lambda);
  }
};
