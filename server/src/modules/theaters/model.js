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
  },
  getTheater7Day: async function (lambda) {
    return await Collection.aggregate([
      {$match: {_id: lambda.conditions._id}},
      {
        $unset: ['is_deleted', 'created_at', 'updated_at']
      },
      {
        $lookup: {
          from: 'film_schedules',
          localField: '_id',
          foreignField: 'theater_id',
          as: 'films'
        }
      },
      {
        $unwind: {
          path: '$films',
          preserveNullAndEmptyArrays: true
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
      // {
      //   $unset: [
      //     'theaters.rooms',
      //     'theaters.is_deleted',
      //     'theaters.created_at',
      //     'theaters.updated_at'
      //   ]
      // },
      {
        $unwind: {
          path: '$films',
          preserveNullAndEmptyArrays: true
        }
      },

      {
        $group: {
          _id: '$_id',
          rooms: {
            $first: '$rooms'
          },
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

      {
        $facet: {
          theater: [
            {
              $group: {
                _id: '$_id',
                rooms: {
                  $first: '$rooms'
                },
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
            },
            {$unset: 'rooms'}
          ],
          day1: [
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
              $addFields: {
                'films.film_schedules': {
                  $map: {
                    input: '$films.film_schedules',
                    in: {
                      _id: '$$this._id',
                      time_start: '$$this.time_start',
                      time_end: '$$this.time_end',
                      film_id: '$$this.film_id',
                      theater_id: '$$this.theater_id',
                      room: '$$this.room',
                      dayOfWeek: {$dayOfWeek: '$$this.time_start'}
                    }
                  }
                }
              }
            },
            {
              $group: {
                _id: '$_id',

                films: {
                  $push: '$films'
                }
              }
            },
            {$unset: ['_id', 'rooms', 'name', 'address', 'url_image']}
          ],
          day2: [
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
                            $gte: ['$time_start', lambda.conditions.time_end]
                          },
                          {
                            $lte: ['$time_start', lambda.conditions.time_end2]
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
              $addFields: {
                'films.film_schedules': {
                  $map: {
                    input: '$films.film_schedules',
                    in: {
                      _id: '$$this._id',
                      time_start: '$$this.time_start',
                      time_end: '$$this.time_end',
                      film_id: '$$this.film_id',
                      theater_id: '$$this.theater_id',
                      room: '$$this.room',
                      dayOfWeek: {$dayOfWeek: '$$this.time_start'}
                    }
                  }
                }
              }
            },

            {
              $group: {
                _id: '$_id',
                films: {
                  $push: '$films'
                }
              }
            },
            {$unset: ['_id', 'rooms', 'name', 'address', 'url_image']}
          ],
          day3: [
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
                            $gte: ['$time_start', lambda.conditions.time_end2]
                          },
                          {
                            $lte: ['$time_start', lambda.conditions.time_end3]
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
              $addFields: {
                'films.film_schedules': {
                  $map: {
                    input: '$films.film_schedules',
                    in: {
                      _id: '$$this._id',
                      time_start: '$$this.time_start',
                      time_end: '$$this.time_end',
                      film_id: '$$this.film_id',
                      theater_id: '$$this.theater_id',
                      room: '$$this.room',
                      dayOfWeek: {$dayOfWeek: '$$this.time_start'}
                    }
                  }
                }
              }
            },

            {
              $group: {
                _id: '$_id',
                films: {
                  $push: '$films'
                }
              }
            },
            {$unset: ['_id', 'rooms', 'name', 'address', 'url_image']}
          ],
          day4: [
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
                            $gte: ['$time_start', lambda.conditions.time_end3]
                          },
                          {
                            $lte: ['$time_start', lambda.conditions.time_end4]
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
              $addFields: {
                'films.film_schedules': {
                  $map: {
                    input: '$films.film_schedules',
                    in: {
                      _id: '$$this._id',
                      time_start: '$$this.time_start',
                      time_end: '$$this.time_end',
                      film_id: '$$this.film_id',
                      theater_id: '$$this.theater_id',
                      room: '$$this.room',
                      dayOfWeek: {$dayOfWeek: '$$this.time_start'}
                    }
                  }
                }
              }
            },

            {
              $group: {
                _id: '$_id',
                films: {
                  $push: '$films'
                }
              }
            },
            {$unset: ['_id', 'rooms', 'name', 'address', 'url_image']}
          ],
          day5: [
            {
              $lookup: {
                from: 'film_schedules',
                let: {
                  film_id: '$films_id',
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
                            $gte: ['$time_start', lambda.conditions.time_end4]
                          },
                          {
                            $lte: ['$time_start', lambda.conditions.time_end5]
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
              $addFields: {
                'films.film_schedules': {
                  $map: {
                    input: '$films.film_schedules',
                    in: {
                      _id: '$$this._id',
                      time_start: '$$this.time_start',
                      time_end: '$$this.time_end',
                      film_id: '$$this.film_id',
                      theater_id: '$$this.theater_id',
                      room: '$$this.room',
                      dayOfWeek: {$dayOfWeek: '$$this.time_start'}
                    }
                  }
                }
              }
            },

            {
              $group: {
                _id: '$_id',
                films: {
                  $push: '$films'
                }
              }
            },
            {$unset: ['_id', 'rooms', 'name', 'address', 'url_image']}
          ],
          day6: [
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
                            $gte: ['$time_start', lambda.conditions.time_end5]
                          },
                          {
                            $lte: ['$time_start', lambda.conditions.time_end6]
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
              $addFields: {
                'films.film_schedules': {
                  $map: {
                    input: '$films.film_schedules',
                    in: {
                      _id: '$$this._id',
                      time_start: '$$this.time_start',
                      time_end: '$$this.time_end',
                      film_id: '$$this.film_id',
                      theater_id: '$$this.theater_id',
                      room: '$$this.room',
                      dayOfWeek: {$dayOfWeek: '$$this.time_start'}
                    }
                  }
                }
              }
            },

            {
              $group: {
                _id: '$_id',
                films: {
                  $push: '$films'
                }
              }
            },
            {$unset: ['_id', 'rooms', 'name', 'address', 'url_image']}
          ],
          day7: [
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
                            $gte: ['$time_start', lambda.conditions.time_end6]
                          },
                          {
                            $lte: ['$time_start', lambda.conditions.time_end7]
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
              $addFields: {
                'films.film_schedules': {
                  $map: {
                    input: '$films.film_schedules',
                    in: {
                      _id: '$$this._id',
                      time_start: '$$this.time_start',
                      time_end: '$$this.time_end',
                      film_id: '$$this.film_id',
                      theater_id: '$$this.theater_id',
                      room: '$$this.room',
                      dayOfWeek: {$dayOfWeek: '$$this.time_start'}
                    }
                  }
                }
              }
            },

            {
              $group: {
                _id: '$_id',
                films: {
                  $push: '$films'
                }
              }
            },
            {$unset: ['_id', 'rooms', 'name', 'address', 'url_image']}
          ]
        }
      },
      {$unwind: '$theater'},
      {$unwind: '$day1'},
      {$unwind: '$day1'},
      {$unwind: '$day2'},
      {$unwind: '$day3'},
      {$unwind: '$day4'},
      {$unwind: '$day5'},
      {$unwind: '$day6'},
      {$unwind: '$day7'},

      //   }
      // },

      {
        $unset: [
          'day1.films._id',
          'day1.films.trailer',
          'day1.films.content',
          'day1.films.countries',
          'day1.films.directors',
          'day1.films.rates',
          'day1.films.rate_count',
          'day1.films.url_background',
          'day1.films.is_blockbuster',
          'day1.films.is_deleted',
          'day1.films.created_at',
          'day1.films.updated_at',
          'day1.films.category_ids',
          'day1.films.film_schedules._id',
          'day1.films.film_schedules.film_id',
          'day1.films.film_schedules.theater_id',

          'day2.films._id',
          'day2.films.trailer',
          'day2.films.content',
          'day2.films.countries',
          'day2.films.directors',
          'day2.films.rates',
          'day2.films.rate_count',
          'day2.films.url_background',
          'day2.films.is_blockbuster',
          'day2.films.is_deleted',
          'day2.films.created_at',
          'day2.films.updated_at',
          'day2.films.category_ids',
          'day2.films.film_schedules._id',
          'day2.films.film_schedules.film_id',
          'day2.films.film_schedules.theater_id',

          'day3.films._id',
          'day3.films.trailer',
          'day3.films.content',
          'day3.films.countries',
          'day3.films.directors',
          'day3.films.rates',
          'day3.films.rate_count',
          'day3.films.url_background',
          'day3.films.is_blockbuster',
          'day3.films.is_deleted',
          'day3.films.created_at',
          'day3.films.updated_at',
          'day3.films.category_ids',
          'day3.films.film_schedules._id',
          'day3.films.film_schedules.film_id',
          'day3.films.film_schedules.theater_id',

          'day4.films._id',
          'day4.films.trailer',
          'day4.films.content',
          'day4.films.countries',
          'day4.films.directors',
          'day4.films.rates',
          'day4.films.rate_count',
          'day4.films.url_background',
          'day4.films.is_blockbuster',
          'day4.films.is_deleted',
          'day4.films.created_at',
          'day4.films.updated_at',
          'day4.films.category_ids',
          'day4.films.film_schedules._id',
          'day4.films.film_schedules.film_id',
          'day4.films.film_schedules.theater_id',

          'day5.films._id',
          'day5.films.trailer',
          'day5.films.content',
          'day5.films.countries',
          'day5.films.directors',
          'day5.films.rates',
          'day5.films.rate_count',
          'day5.films.url_background',
          'day5.films.is_blockbuster',
          'day5.films.is_deleted',
          'day5.films.created_at',
          'day5.films.updated_at',
          'day5.films.category_ids',
          'day5.films.film_schedules._id',
          'day5.films.film_schedules.film_id',
          'day5.films.film_schedules.theater_id',

          'day6.films._id',
          'day6.films.trailer',
          'day6.films.content',
          'day6.films.countries',
          'day6.films.directors',
          'day6.films.rates',
          'day6.films.rate_count',
          'day6.films.url_background',
          'day6.films.is_blockbuster',
          'day6.films.is_deleted',
          'day6.films.created_at',
          'day6.films.updated_at',
          'day6.films.category_ids',
          'day6.films.film_schedules._id',
          'day6.films.film_schedules.film_id',
          'day6.films.film_schedules.theater_id',

          'day7.films._id',
          'day7.films.trailer',
          'day7.films.content',
          'day7.films.countries',
          'day7.films.directors',
          'day7.films.rates',
          'day7.films.rate_count',
          'day7.films.url_background',
          'day7.films.is_blockbuster',
          'day7.films.is_deleted',
          'day7.films.created_at',
          'day7.films.updated_at',
          'day7.films.category_ids',
          'day7.films.film_schedules._id',
          'day7.films.film_schedules.film_id',
          'day7.films.film_schedules.theater_id'
        ]
      }
    ]);
  }
};
