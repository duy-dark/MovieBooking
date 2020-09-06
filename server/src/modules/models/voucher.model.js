const mongoose = require('mongoose');

let voucherSchema = new mongoose.Schema(
  {
    code: String,
    event_id: String,
    updated_at: Date,
    is_deleted: Boolean
  },
  {versionKey: false}
);

let Voucher = mongoose.model('Voucher', voucherSchema, 'vouchers');

module.exports = {
  findByLamda: async function (lamda) {
    return await Voucher.find(lamda);
  },
  createByLamda: async function (lamda) {
    return await Voucher.insertMany(lamda);
  },
  updateByLamda: async function (id, lamda) {
    return await Voucher.updateOne(id, lamda);
  }
};
