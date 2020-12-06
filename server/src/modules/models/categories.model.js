const mongoose = require('mongoose');

let categorySchema = new mongoose.Schema(
  {
    name: String,
    is_deleted: Boolean,
    updated_at: Date
  },
  {versionKey: false}
);

let Category = mongoose.model('Category', categorySchema, 'categories');

module.exports = {
  findByLambda: async function (lambda) {
    return await Category.find(lambda);
  },
  createByLambda: async function (lambda) {
    return await Category.insertMany(lambda);
  },
  updateByLambda: async function (id, lambda) {
    return await Category.updateOne(id, lambda);
  }
};
