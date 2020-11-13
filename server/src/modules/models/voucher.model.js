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
  findByLambda: async function (lambda) {
    return await Voucher.find(lambda);
  },
  createByLambda: async function (lambda) {
    return await Voucher.insertMany(lambda);
  },
  updateByLambda: async function (id, lambda) {
    return await Voucher.updateOne(id, lambda);
  }
};
