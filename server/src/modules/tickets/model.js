const mongoose = require('mongoose');

let schema = new mongoose.Schema(
  {
    count: Number,
    booking_time: Date,
    cost: Number,
    customer_id: require('mongodb').ObjectID,
    film_schedule_id: require('mongodb').ObjectID,
    voucher_id: require('mongodb').ObjectID,
    email: String,
    phone_number: String,
    payment: String,
    seat_ids: [String],
    categories: [String],
    is_deleted: Boolean,
    created_at: Date,
    updated_at: Date
  },
  {versionKey: false}
);

let Collection = mongoose.model('Ticket', schema, 'tickets');

module.exports = {
  findByLambda: async function (lambda) {
    return await Collection.find(lambda.conditions, lambda.views);
  },
  createByLambda: async function (lambda) {
    return await Collection.insertMany(lambda);
  },
  updateByLambda: async function (lambda) {
    return await Collection.updateOne(lambda.conditions, lambda.params);
  },
  getTicket: async function (lambda) {
    //return await Collection.find();
    return await Collection.aggregate([
      {
        $match: {
          film_schedule_id: lambda
        }
      },
      {
        $unwind: {
          path: '$seat_ids',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $group: {
          _id: '$seat_ids',
          seats: {
            $first: '$seat_ids'
          }
        }
      },
      {$unset: ['_id']}
    ]);
  },
  getDetail: async function (lambda) {
    return await Collection.aggregate([
      {$match: lambda.conditions},
      {
        $lookup: {
          from: 'film_schedules',
          localField: 'film_schedule_id',
          foreignField: '_id',
          as: 'film_schedules'
        }
      },
      {
        $addFields: {
          film_schedules: {
            $map: {
              input: '$film_schedules',
              in: {
                _id: '$$this._id',
                time_start: '$$this.time_start',
                time_end: '$$this.time_end',
                theater: '$$this.theater_id',
                room_id: '$$this.room_id'
              }
            }
          }
        }
      },
      {
        $lookup: {
          from: 'customers',
          localField: 'customer_id',
          foreignField: '_id',
          as: 'customers'
        }
      },
      {
        $addFields: {
          customers: {
            $map: {
              input: '$customers',
              in: {name: '$$this.name'}
            }
          }
        }
      },
      {
        $project: lambda.views
      }
    ]);
  }
};
