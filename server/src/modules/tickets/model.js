const mongoose = require('mongoose');

let schema = new mongoose.Schema(
  {
    customer_id: String,
    film_id: String,
    count: Number,
    voucher_id: String,
    seat: Array,
    booking_time: Date,
    cost: Number,
    is_deleted: Boolean,
    created_at: Date,
    updated_at: Date
  },
  {versionKey: false}
);

let Collection = mongoose.model('Ticket', schema, 'tickets');

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
  }
};
