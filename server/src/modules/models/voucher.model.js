var mongoose = require('mongoose');

var voucherSchema = new mongoose.Schema(
  {
    code: String,
    event_id: String,
    updated_at: Date,
    is_deleted: Boolean
  },
  {versionKey: false}
);

var Voucher = mongoose.model('Voucher', voucherSchema, 'vouchers');

module.exports = {
  findByLamda: async function (lamda) {
    var vouchers = await Voucher.find(lamda);
    return vouchers;
  },
  createByLamda: async function (lamda) {
    await Voucher.insertMany(lamda);
  },
  updateByLamda: async function (id, lamda) {
    await Voucher.updateOne(id, lamda);
  },
  deleteByLamda: async function (lamda) {
    await Voucher.deleteOne(lamda);
  }
};
