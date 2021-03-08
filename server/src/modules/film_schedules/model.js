const mongoose = require('mongoose');
const moment = require('moment');

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
  findByLambda_detail: async function (lambda, time_now) {
    return await Collection.aggregate([
      {
        $match: {
          $and: [
            lambda.conditions,
            {
              time_start: {
                $gte: time_now
              }
            }
          ]
        }
      },
      {
        $lookup: {
          from: 'rooms',
          localField: 'room_id',
          foreignField: '_id',
          as: 'room'
        }
      },
      {
        $unset: [
          'room.is_deleted',
          'room.created_at',
          'room.updated_at',
          'room.seats'
        ]
      },
      {
        $lookup: {
          from: 'theaters',
          localField: 'theater_id',
          foreignField: '_id',
          as: 'theater'
        }
      },
      {
        $unset: [
          'theater.is_deleted',
          'theater.created_at',
          'theater.updated_at',
          'theater.rooms'
        ]
      },
      {
        $unwind: {
          path: '$room',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind: {
          path: '$theater',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: lambda.views
      }
    ]);
  },
  getNowShowing: async function (lambda) {
    return await Collection.aggregate([
      {
        // $match: {
        //   time_start: {
        //     $gte: lambda.conditions.time_start,
        //     $lte: lambda.conditions.time_end7
        //   }
        // },

        $match: {
          $and: [
            {
              time_start: {
                $gte: lambda.conditions.time_start,
                $lte: lambda.conditions.time_end7
              }
            },
            {is_deleted: false}
          ]
        }
      },
      {
        $facet: {
          theaters: [
            {
              $lookup: {
                from: 'theaters',
                localField: 'theater_id',
                foreignField: '_id',
                as: 'theaters'
              }
            },

            {
              $replaceRoot: {
                newRoot: {
                  $mergeObjects: ['$theaters']
                }
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
                }
              }
            }
          ],
          films: [
            {
              $lookup: {
                from: 'films',
                localField: 'film_id',
                foreignField: '_id',
                as: 'films'
              }
            },

            {
              $replaceRoot: {
                newRoot: {
                  $mergeObjects: ['$films']
                }
              }
            },
            {
              $group: {
                _id: '$_id',
                name: {
                  $first: '$name'
                }
              }
            }
          ],
          dayOfWeek: [
            {
              $bucket: {
                groupBy: '$time_start', // Field to group by
                boundaries: [
                  lambda.conditions.time_start,
                  lambda.conditions.time_end1,
                  lambda.conditions.time_end2,
                  lambda.conditions.time_end3,
                  lambda.conditions.time_end4,
                  lambda.conditions.time_end5,
                  lambda.conditions.time_end6,
                  lambda.conditions.time_end7
                ], // Boundaries for the buckets
                output: {
                  // Output for each bucket
                  count: {$sum: 1},
                  schedules: {
                    $push: {
                      _id: '$_id',
                      time_start: '$time_start',
                      time_end: '$time_end',
                      film_id: '$film_id',
                      theater_id: '$theater_id',
                      room_id: '$room_id'
                    }
                  }
                }
              }
            },
            {
              $unwind: {
                path: '$schedules',
                preserveNullAndEmptyArrays: true
              }
            },
            {$sort: {'schedules.time_start': 1}},
            {
              $lookup: {
                from: 'rooms',
                localField: 'schedules.room_id',
                foreignField: '_id',
                as: 'schedules.rooms'
              }
            },
            {
              $unwind: {
                path: '$schedules.rooms',
                preserveNullAndEmptyArrays: true
              }
            },
            {
              $group: {
                _id: '$_id',
                count: {
                  $first: '$count'
                },
                schedules: {
                  $push: '$schedules'
                }
              }
            },
            {$sort: {'schedules.time_start': 1}}
          ]
        }
      },
      {
        $addFields: {
          dayOfWeek: {
            $map: {
              input: '$dayOfWeek',
              in: {
                _id: '$$this._id',
                date: '$$this._id',
                count: '$$this.count',
                schedules: '$$this.schedules'
              }
            }
          }
        }
      },
      {$unset: ['dayOfWeek._id', 'dayOfWeek.schedules.rooms.seats']}
    ]);
  },

  getRoomInfoForTicket: async function (lambda) {
    return await Collection.aggregate([
      {
        $match: {
          $and: [lambda.conditions]
        }
      },
      {
        $lookup: {
          from: 'rooms',
          localField: 'room_id',
          foreignField: '_id',
          as: 'room'
        }
      },
      {
        $unset: [
          'room.is_deleted',
          'room.created_at',
          'room.updated_at'
          // 'room.seats'
        ]
      },
      {
        $lookup: {
          from: 'theaters',
          localField: 'theater_id',
          foreignField: '_id',
          as: 'theater'
        }
      },
      {
        $unset: [
          'theater.is_deleted',
          'theater.created_at',
          'theater.updated_at',
          'theater.rooms'
        ]
      },
      {
        $unwind: {
          path: '$room',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind: {
          path: '$theater',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: lambda.views
      }
    ]);
  }
};
