const mongoose = require('mongoose');

let schema = new mongoose.Schema(
  {
    time_start: Date,
    time_end: Date,
    film_id: require('mongodb').ObjectId,
    theater_id: require('mongodb').ObjectId,
    room_id: require('mongodb').ObjectId,
    is_deleted: Boolean,
    created_at: Date,
    updated_at: Date
  },
  {versionKey: false}
);

let Collection = mongoose.model('FilmSchedules', schema, 'film_schedules');

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
  getNowShowing: async function (lambda) {
    return await Collection.aggregate([
      {
        $match: {
          time_start: {
            $gte: lambda.gte_match,
            $lte: lambda.lte_match
          },
          end_time: {$gte: lambda.gte_end, $lte: lambda.lte_end}
        }
      }
    ]);
  }
};
