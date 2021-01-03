const mongoose = require('mongoose');
const {getComingSoon} = require('./handler');

let schema = new mongoose.Schema(
  {
    name: String,
    content: String,
    countries: String,
    long_time: Number,
    start_date: Date,
    directors: String,
    actors: String,
    rates: Number,
    rate_count: Number,
    imdb: Number,
    digitals: String,
    url_avatar: String,
    url_background: String,
    is_blockbuster: Boolean,
    is_deleted: Boolean,
    updated_at: Date
  },
  {versionKey: false}
);

let Collection = mongoose.model('Film', schema, 'films');

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
  getComingSoon: async function (lambda) {
    return await Collection.aggregate([
      {
        // $match: {
        //   time_start: {
        //     $gte: new Date(moment(timezone).format()),
        //     $lte: new Date(moment('31/12/9999').format())
        //   }
        // }

        $lookup: {
          from: 'FilmSchedules',
          localField: 'start_date',
          foreignField: 'time_start',
          as: 'films_schedule'
        }
      }
    ]);
  },

  getNowShowing: async function (lambda) {
    return await Film.aggregate([
      {
        $match: {
          start_date: {
            $gte: new Date(moment('01/01/2000', 'MM/DD/YYYY').format()),
            $lte: new Date(moment('01/01/2030', 'MM/DD/YYYY').format())
          }
          // end_time: {
          //   $gte: new Date(moment('01/01/2001', 'MM/DD/YYYY').format()),
          //   $lte: new Date(moment('09/09/9999', 'MM/DD/YYYY').format())
          // }
        }
      }
    ]);
  }
};
