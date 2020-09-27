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
  findByLamda: async function (lamda) {
    return await Category.find(lamda);
  },
  createByLamda: async function (lamda) {
    return await Category.insertMany(lamda);
  },
  updateByLamda: async function (id, lamda) {
    return await Category.updateOne(id, lamda);
  }
};
