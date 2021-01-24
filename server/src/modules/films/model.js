const mongoose = require('mongoose');

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
    category_ids: [require('mongodb').ObjectId],
    is_deleted: Boolean,
    created_at: Date,
    updated_at: Date
  },
  {versionKey: false}
);

let Collection = mongoose.model('Film', schema, 'films');

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
          start_date: {
            $gte: lambda.gte_start_date,
            $lte: lambda.lte_start_date
          }
        }
      }
    ]);
  },
  getcomment: async function (lambda) {
    return await Collection.aggregate([
      {
        $lookup: {
          from: 'film_comments',
          localField: '_id',
          foreignField: 'film_id',
          as: 'comment'
        }
      },
      {
        $unset: ['trailer', '_id']
      },
      {$unwind: {path: '$comment', preserveNullAndEmptyArrays: true}},
      {
        $lookup: {
          from: 'customers',
          localField: 'comment.customer_id',
          foreignField: '_id',
          as: 'customer'
        }
      },
      {
        $replaceRoot: {
          newRoot: {
            film_id: '$comment.film_id',
            comment_id: '$comment._id',
            content: '$comment.content',
            rates: '$comment.rate',
            user_id: '$customer._id',
            name: '$customer.name'
          }
        }
      },
      {$unwind: {path: '$user_id', preserveNullAndEmptyArrays: true}},
      {$unwind: {path: '$name', preserveNullAndEmptyArrays: true}}
    ]);
  },
  getDetail: async function (lambda) {
    return await Collection.aggregate([
      {$match: lambda.conditions},
      {
        $lookup: {
          from: 'film_schedules',
          localField: '_id',
          foreignField: 'film_id',
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
                theater_id: '$$this.theater_id',
                room: '$$this.room'
              }
            }
          }
        }
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'category_ids',
          foreignField: '_id',
          as: 'categories'
        }
      },
      {
        $addFields: {
          categories: {
            $map: {
              input: '$categories',
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
