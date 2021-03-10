const mongoose = require('mongoose');

let schema = new mongoose.Schema(
  {
    code: String,
    count: Number,
    cost: Number,
    customer_id: require('mongodb').ObjectID,
    film_schedule_id: require('mongodb').ObjectID,
    film_id: require('mongodb').ObjectID,
    room_id: require('mongodb').ObjectID,
    theater_id: require('mongodb').ObjectID,
    voucher_id: require('mongodb').ObjectID,
    email: String,
    phone_number: String,
    payment: String,
    seats: [String],
    momo_payment: Boolean,
    direct_payment: Boolean,
    ticket_status: Number,
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
  getTicketBySchedule: async function (conditions) {
    //return await Collection.find();
    return await Collection.aggregate([
      {
        $match: {
          $and: [
            conditions,
            {
              ticket_status: {
                $in: [0, 1, 2]
              }
            }
          ]
        }
      },
      {
        $unwind: {
          path: '$seats',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $group: {
          _id: '$seats',
          seats: {
            $first: '$seats'
          }
        }
      },
      {$unset: ['_id']}
    ]);
  },
  getDetail: async function (lambda) {
    console.log(lambda.conditions);
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
                theater_id: '$$this.theater_id',
                room_id: '$$this.room_id',
                film_id: '$$this.film_id'
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
              in: {
                _id: '$$this._id',
                name: '$$this.name',
                point: '$$this.point',
                count: '$$this.count'
              }
            }
          }
        }
      },
      // {$unwind: '$film_schedules'},
      // {$unwind: '$customers'},
      {
        $unwind: {path: '$film_schedules', preserveNullAndEmptyArrays: true}
      },
      {
        $unwind: {path: '$customers', preserveNullAndEmptyArrays: true}
      },
      {
        $project: lambda.views
      }
    ]);
  },
  getListDetail: async function (lambda) {
    return await Collection.aggregate([
      {
        $match: {
          $and: [lambda.conditions]
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
                theater_id: '$$this.theater_id',
                room_id: '$$this.room_id',
                film_id: '$$this.film_id'
              }
            }
          }
        }
      },
      // {$unwind: '$film_schedules'},
      {
        $unwind: {path: '$film_schedules', preserveNullAndEmptyArrays: true}
      },
      {
        $lookup: {
          from: 'films',
          localField: 'film_schedules.film_id',
          foreignField: '_id',
          as: 'film_schedules.films'
        }
      },
      {
        $addFields: {
          'film_schedules.films': {
            $map: {
              input: '$film_schedules.films',
              in: {name: '$$this.name'}
            }
          }
        }
      },
      {
        $lookup: {
          from: 'theaters',
          localField: 'film_schedules.theater_id',
          foreignField: '_id',
          as: 'film_schedules.theaters'
        }
      },
      {
        $addFields: {
          'film_schedules.theaters': {
            $map: {
              input: '$film_schedules.theaters',
              in: {name: '$$this.name', address: '$$this.address'}
            }
          }
        }
      },
      {
        $lookup: {
          from: 'rooms',
          localField: 'film_schedules.room_id',
          foreignField: '_id',
          as: 'film_schedules.rooms'
        }
      },
      {
        $addFields: {
          'film_schedules.rooms': {
            $map: {
              input: '$film_schedules.rooms',
              in: {name: '$$this.name'}
            }
          }
        }
      },
      // {$unwind: '$film_schedules.films'},
      // {$unwind: '$film_schedules.theaters'},
      // {$unwind: '$film_schedules.rooms'},
      // {$unwind: '$customers'},
      {
        $unwind: {
          path: '$film_schedules.films',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind: {
          path: '$film_schedules.theaters',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind: {
          path: '$film_schedules.rooms',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind: {path: '$customers', preserveNullAndEmptyArrays: true}
      },
      {$sort: {created_at: -1}},
      {$limit: lambda.limit}
    ]);
  },

  statistical: async function (conditions, time_start, time_end) {
    return await Collection.aggregate([
      {
        $facet: {
          success: [
            {
              $match: {
                $and: [
                  conditions,
                  {
                    created_at: {
                      $gte: time_start,
                      $lte: time_end
                    }
                  },
                  {
                    ticket_status: {
                      $in: [1, 2]
                    }
                  }
                ]
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
                      theater_id: '$$this.theater_id',
                      room_id: '$$this.room_id',
                      film_id: '$$this.film_id'
                    }
                  }
                }
              }
            },
            // {$unwind: '$film_schedules'},
            {
              $unwind: {
                path: '$film_schedules',
                preserveNullAndEmptyArrays: true
              }
            },
            {
              $lookup: {
                from: 'films',
                localField: 'film_schedules.film_id',
                foreignField: '_id',
                as: 'film_schedules.films'
              }
            },
            {
              $addFields: {
                'film_schedules.films': {
                  $map: {
                    input: '$film_schedules.films',
                    in: {name: '$$this.name'}
                  }
                }
              }
            },
            {
              $lookup: {
                from: 'theaters',
                localField: 'film_schedules.theater_id',
                foreignField: '_id',
                as: 'film_schedules.theaters'
              }
            },
            {
              $addFields: {
                'film_schedules.theaters': {
                  $map: {
                    input: '$film_schedules.theaters',
                    in: {name: '$$this.name', address: '$$this.address'}
                  }
                }
              }
            },
            {
              $lookup: {
                from: 'rooms',
                localField: 'film_schedules.room_id',
                foreignField: '_id',
                as: 'film_schedules.rooms'
              }
            },
            {
              $addFields: {
                'film_schedules.rooms': {
                  $map: {
                    input: '$film_schedules.rooms',
                    in: {name: '$$this.name'}
                  }
                }
              }
            },
            // {$unwind: '$film_schedules.films'},
            // {$unwind: '$film_schedules.theaters'},
            // {$unwind: '$film_schedules.rooms'},
            // {$unwind: '$customers'},
            {
              $unwind: {
                path: '$film_schedules.films',
                preserveNullAndEmptyArrays: true
              }
            },
            {
              $unwind: {
                path: '$film_schedules.theaters',
                preserveNullAndEmptyArrays: true
              }
            },
            {
              $unwind: {
                path: '$film_schedules.rooms',
                preserveNullAndEmptyArrays: true
              }
            },
            {
              $unwind: {path: '$customers', preserveNullAndEmptyArrays: true}
            },
            {$sort: {created_at: -1}}
          ],
          failure: [
            {
              $match: {
                $and: [
                  conditions,
                  {
                    created_at: {
                      $gte: time_start,
                      $lte: time_end
                    }
                  },
                  {
                    ticket_status: {
                      $in: [-1]
                    }
                  }
                ]
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
                      theater_id: '$$this.theater_id',
                      room_id: '$$this.room_id',
                      film_id: '$$this.film_id'
                    }
                  }
                }
              }
            },
            // {$unwind: '$film_schedules'},
            {
              $unwind: {
                path: '$film_schedules',
                preserveNullAndEmptyArrays: true
              }
            },
            {
              $lookup: {
                from: 'films',
                localField: 'film_schedules.film_id',
                foreignField: '_id',
                as: 'film_schedules.films'
              }
            },
            {
              $addFields: {
                'film_schedules.films': {
                  $map: {
                    input: '$film_schedules.films',
                    in: {name: '$$this.name'}
                  }
                }
              }
            },
            {
              $lookup: {
                from: 'theaters',
                localField: 'film_schedules.theater_id',
                foreignField: '_id',
                as: 'film_schedules.theaters'
              }
            },
            {
              $addFields: {
                'film_schedules.theaters': {
                  $map: {
                    input: '$film_schedules.theaters',
                    in: {name: '$$this.name', address: '$$this.address'}
                  }
                }
              }
            },
            {
              $lookup: {
                from: 'rooms',
                localField: 'film_schedules.room_id',
                foreignField: '_id',
                as: 'film_schedules.rooms'
              }
            },
            {
              $addFields: {
                'film_schedules.rooms': {
                  $map: {
                    input: '$film_schedules.rooms',
                    in: {name: '$$this.name'}
                  }
                }
              }
            },
            // {$unwind: '$film_schedules.films'},
            // {$unwind: '$film_schedules.theaters'},
            // {$unwind: '$film_schedules.rooms'},
            // {$unwind: '$customers'},
            {
              $unwind: {
                path: '$film_schedules.films',
                preserveNullAndEmptyArrays: true
              }
            },
            {
              $unwind: {
                path: '$film_schedules.theaters',
                preserveNullAndEmptyArrays: true
              }
            },
            {
              $unwind: {
                path: '$film_schedules.rooms',
                preserveNullAndEmptyArrays: true
              }
            },
            {
              $unwind: {path: '$customers', preserveNullAndEmptyArrays: true}
            },
            {$sort: {created_at: -1}}
          ]
        }
      }
    ]);
  }
};
