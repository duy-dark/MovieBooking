const mongoose = require('mongoose');

let schema = new mongoose.Schema(
  {
    film_id: mongoose.Types.ObjectId,
    time_start: Date,
    time_end: Date,
    theater_id: String,
    is_deleted: Boolean,
    created_at: Date,
    updated_at: Date
  },
  {versionKey: false}
);

let Collection = mongoose.model('FilmSchedules', schema, 'film_schedules');

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
  },
  getNowShowing: async function (lambda) {
    return await Collection.aggregate([
      {
        $lookup: {
          from: 'films',
          localField: 'film_id',
          foreignField: '_id',
          as: 'film_result'
        }
      },
      {
        $match: {
          time_start: {
            $gte: lambda.gte_match,
            $lte: lambda.lte_match
          },
          time_end: {$gte: lambda.gte_end, $lte: lambda.lte_end}
        }
      }
    ]);
  },
  getComingSoon: async function (lambda) {
    return await Collection.aggregate([
      {
        $match: {
          time_start: {
            $gte: lambda.gte_match,
            $lte: lambda.lte_match
          }
        }
      }
    ]);
  }
};
