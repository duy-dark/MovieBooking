const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

let schema = new mongoose.Schema(
  {
    name: String,
    address: String,
    url_image: String,
    comment: String,
    room_ids: [require('mongodb').ObjectID],
    is_deleted: Boolean,
    created_at: Date,
    updated_at: Date
  },
  {versionKey: false}
);

let Collection = mongoose.model('Theater', schema, 'theaters');

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

  getFilmToDay: async function (lambda) {
    return await Collection.aggregate([
      {$unset: ['rooms', 'is_deleted', 'created_at', 'updated_at']},
      {
        $lookup: {
          from: 'film_schedules',
          localField: '_id',
          foreignField: 'theater_id',
          as: 'films'
        }
      },
      {
        $unset: [
          'film_schedules.is_deleted',
          'film_schedules.created_at',
          'film_schedules.updated_at'
        ]
      },

      {
        $unwind: {
          path: '$films',
          preserveNullAndEmptyArrays: true
        }
      },

      {
        $match: {
          'films.time_start': {
            $gte: lambda.conditions.time_start,
            $lte: lambda.conditions.time_end
          }
        }
      },

      {
        $lookup: {
          from: 'films',
          localField: 'films.film_id',
          foreignField: '_id',
          as: 'films'
        }
      },
      {
        $unset: [
          'films.content',
          'films.directors',
          'films.actors',
          'films.imdb',
          'films.digitals',
          'films.is_deleted',
          'films.created_at',
          'films.updated_at',
          'films.category_ids'
        ]
      },

      {
        $unwind: {
          path: '$films',
          preserveNullAndEmptyArrays: true
        }
      },

      {
        $group: {
          _id: '$_id',
          name: {
            $first: '$name'
          },
          address: {
            $first: '$address'
          },
          url_image: {
            $first: '$url_image'
          },
          films: {
            $addToSet: '$films'
          }
        }
      },

      {
        $unwind: {
          path: '$films',
          preserveNullAndEmptyArrays: true
        }
      },

      // {
      //   $lookup: {
      //     from: 'film_schedules',
      //     localField: 'film._id',
      //     foreignField: 'id',
      //     as: 'films.film_schedules'
      //   }
      // },

      {
        $lookup: {
          from: 'film_schedules',
          let: {
            film_id: '$films._id',
            theaters_id: '$_id'
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
          as: 'films.film_schedules'
        }
      },

      {
        $unset: [
          'films.film_schedules.is_deleted',
          'films.film_schedules.created_at',
          'films.film_schedules.updated_at'
        ]
      },

      {
        $group: {
          _id: '$_id',
          name: {
            $first: '$name'
          },
          address: {
            $first: '$address'
          },
          url_image: {
            $first: '$url_image'
          },
          films: {
            $push: '$films'
          }
        }
      }
    ]);
  }
};
