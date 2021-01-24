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

let getDayOfWeek = (number) => {
  if (number == 7) {
    return 'Thứ 7';
  }
};

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

  getFilm7Day: async function (lambda) {
    return await Collection.aggregate([
      {$match: {_id: lambda.conditions._id}},
      {
        $unset: ['is_deleted', 'created_at', 'updated_at']
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
        $unset: [
          'categories.is_deleted',
          'categories.created_at',
          'categories.updated_at'
        ]
      },
      {
        $lookup: {
          from: 'film_schedules',
          localField: '_id',
          foreignField: 'film_id',
          as: 'theaters'
        }
      },
      {
        $unwind: {
          path: '$theaters',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'theaters',
          localField: 'theaters.theater_id',
          foreignField: '_id',
          as: 'theaters'
        }
      },
      {
        $unset: [
          'theaters.rooms',
          'theaters.is_deleted',
          'theaters.created_at',
          'theaters.updated_at'
        ]
      },
      {
        $unwind: {
          path: '$theaters',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $group: {
          _id: '$_id',
          name: {
            $first: '$name'
          },
          trailer: {
            $first: '$trailer'
          },

          categories: {
            $first: '$categories'
          },
          long_time: {
            $first: '$long_time'
          },
          start_date: {
            $first: '$start_date'
          },
          rates: {
            $first: '$rates'
          },
          rate_count: {
            $first: '$rate_count'
          },
          content: {
            $first: '$content'
          },
          imdb: {
            $first: '$imdb'
          },
          directors: {
            $first: '$directors'
          },
          actors: {
            $first: '$actors'
          },
          digitals: {
            $first: '$digitals'
          },
          countries: {
            $first: '$countries'
          },
          url_avatar: {
            $first: '$url_avatar'
          },
          url_background: {
            $first: '$url_background'
          },
          is_blockbuster: {
            $first: '$is_blockbuster'
          },
          theaters: {
            $addToSet: '$theaters'
          }
        }
      },

      {
        $unwind: {
          path: '$theaters',
          preserveNullAndEmptyArrays: true
        }
      },

      {
        $lookup: {
          from: 'film_schedules',
          let: {
            film_id: '$_id',
            theaters_id: '$theaters._id'
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: ['$film_id', '$$film_id']
                    },
                    {
                      $eq: ['$theater_id', '$$theaters_id']
                    },
                    {
                      $gte: ['$time_start', lambda.conditions.time_start]
                    },
                    {
                      $lte: ['$time_start', lambda.conditions.time_end]
                    }
                  ]
                }
              }
            }
          ],
          as: 'theaters.film_schedules'
        }
      },

      {
        $addFields: {
          'theaters.film_schedules': {
            $map: {
              input: '$theaters.film_schedules',
              in: {
                _id1: '$$this._id',
                time_start: '$$this.time_start',
                time_end: '$$this.time_end',
                film_id: '$$this.film_id',
                theater_id: '$$this.theater_id',
                room1: '$$this.room',
                dayOfWeek: {$dayOfWeek: '$$this.time_start'}
              }
            }
          }
        }
      },

      {
        $group: {
          _id: '$_id',
          name: {
            $first: '$name'
          },
          trailer: {
            $first: '$trailer'
          },
          categories: {
            $first: '$categories'
          },
          long_time: {
            $first: '$long_time'
          },
          start_date: {
            $first: '$start_date'
          },
          content: {
            $first: '$content'
          },
          rates: {
            $first: '$rates'
          },
          rate_count: {
            $first: '$rate_count'
          },
          imdb: {
            $first: '$imdb'
          },
          directors: {
            $first: '$directors'
          },
          actors: {
            $first: '$actors'
          },
          digitals: {
            $first: '$digitals'
          },
          countries: {
            $first: '$countries'
          },
          url_avatar: {
            $first: '$url_avatar'
          },
          url_background: {
            $first: '$url_background'
          },
          is_blockbuster: {
            $first: '$is_blockbuster'
          },
          theaters: {
            $push: '$theaters'
          }
        }
      }
    ]);
  }
};
