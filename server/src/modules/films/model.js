const mongoose = require('mongoose');

let schema = new mongoose.Schema(
  {
    name: String,
    content: String,
    countries: String,
    long_time: Number,
    start_date: Date,
    directors: String,
    trailer: String,
    actors: String,
    rate_average: Number,
    rate_count: Number,
    rates: Object,
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

  findByLambda_detail: async function (lambda) {
    return await Collection.aggregate([
      {
        $match: {
          $and: [lambda.conditions]
        }
      },
      // {$unwind: '$category_ids'},
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
      }
    ]);
  },

  createByLambda: async function (lambda) {
    return await Collection.insertMany(lambda);
  },
  updateByLambda: async function (lambda) {
    return await Collection.updateOne(lambda.conditions, lambda.params);
  },
  getCommingSoon: async function (lambda) {
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
                room_id: '$$this.room_id'
              }
            }
          }
        }
      },
      {
        $unwind: {
          path: '$film_schedules',
          preserveNullAndEmptyArrays: true
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
        $lookup: {
          from: 'rooms',
          localField: 'film_schedules.room_id',
          foreignField: '_id',
          as: 'film_schedules.room'
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
          path: '$film_schedules.room',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unset: ['film_schedules.room.seats', 'film_schedules.theaters.rooms']
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
          rate_average: {
            $first: '$rate_average'
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

          film_schedules: {
            $addToSet: '$film_schedules'
          }
        }
      },

      {
        $project: lambda.views
      }
    ]);
  },

  getFilm7Day: async function (lambda) {
    return await Collection.aggregate([
      {$match: {$and: [{_id: lambda.conditions._id}, {is_deleted: false}]}},
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
      // {
      //   $lookup: {
      //     from: 'film_schedules',
      //     localField: '_id',
      //     foreignField: 'film_id',
      //     as: 'theaters'
      //   }
      // },
      {
        $lookup: {
          from: 'film_schedules',
          let: {
            film_id: '$_id',
            is_deleted: false
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
                      $eq: ['$is_deleted', '$$is_deleted']
                    }
                  ]
                }
              }
            }
          ],
          as: 'theaters'
        }
      },

      {
        $unwind: {
          path: '$theaters',
          preserveNullAndEmptyArrays: true
        }
      },
      // {
      //   $lookup: {
      //     from: 'theaters',
      //     localField: 'theaters.theater_id',
      //     foreignField: '_id',
      //     as: 'theaters'
      //   }
      // },
      {
        $lookup: {
          from: 'theaters',
          let: {
            theater_id: '$theaters.theater_id',
            is_deleted: false
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: ['$_id', '$$theater_id']
                    },
                    {
                      $eq: ['$is_deleted', '$$is_deleted']
                    }
                  ]
                }
              }
            }
          ],
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
          rate_average: {
            $first: '$rate_average'
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
        $facet: {
          film: [
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
                rate_average: {
                  $first: '$rate_average'
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
                }
              }
            }
          ],
          day1: [
            {
              $lookup: {
                from: 'film_schedules',
                let: {
                  film_id: '$_id',
                  theaters_id: '$theaters._id',
                  is_deleted: false
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
                            $eq: ['$is_deleted', '$$is_deleted']
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
                      _id: '$$this._id',
                      time_start: '$$this.time_start',
                      time_end: '$$this.time_end',
                      film_id: '$$this.film_id',
                      theater_id: '$$this.theater_id',
                      room_id: '$$this.room_id',
                      dayOfWeek: {$dayOfWeek: '$$this.time_start'}
                    }
                  }
                }
              }
            },
            {$sort: {'theaters.film_schedules.time_start': -1}},

            {
              $group: {
                _id: '$_id',

                theaters: {
                  $push: '$theaters'
                }
              }
            }
          ],
          day2: [
            {
              $lookup: {
                from: 'film_schedules',
                let: {
                  film_id: '$_id',
                  theaters_id: '$theaters._id',
                  is_deleted: false
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
                            $eq: ['$is_deleted', '$$is_deleted']
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
                as: 'theaters.film_schedules'
              }
            },

            {
              $addFields: {
                'theaters.film_schedules': {
                  $map: {
                    input: '$theaters.film_schedules',
                    in: {
                      _id: '$$this._id',
                      time_start: '$$this.time_start',
                      time_end: '$$this.time_end',
                      film_id: '$$this.film_id',
                      theater_id: '$$this.theater_id',
                      room_id: '$$this.room_id',
                      dayOfWeek: {$dayOfWeek: '$$this.time_start'}
                    }
                  }
                }
              }
            },
            {$sort: {'theaters.film_schedules.time_start': -1}},

            {
              $group: {
                _id: '$_id',
                theaters: {
                  $push: '$theaters'
                }
              }
            }
          ],
          day3: [
            {
              $lookup: {
                from: 'film_schedules',
                let: {
                  film_id: '$_id',
                  theaters_id: '$theaters._id',
                  is_deleted: false
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
                            $eq: ['$is_deleted', '$$is_deleted']
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
                as: 'theaters.film_schedules'
              }
            },

            {
              $addFields: {
                'theaters.film_schedules': {
                  $map: {
                    input: '$theaters.film_schedules',
                    in: {
                      _id: '$$this._id',
                      time_start: '$$this.time_start',
                      time_end: '$$this.time_end',
                      film_id: '$$this.film_id',
                      theater_id: '$$this.theater_id',
                      room_id: '$$this.room_id',
                      dayOfWeek: {$dayOfWeek: '$$this.time_start'}
                    }
                  }
                }
              }
            },
            {$sort: {'theaters.film_schedules.time_start': -1}},

            {
              $group: {
                _id: '$_id',
                theaters: {
                  $push: '$theaters'
                }
              }
            }
          ],
          day4: [
            {
              $lookup: {
                from: 'film_schedules',
                let: {
                  film_id: '$_id',
                  theaters_id: '$theaters._id',
                  is_deleted: false
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
                            $eq: ['$is_deleted', '$$is_deleted']
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
                as: 'theaters.film_schedules'
              }
            },

            {
              $addFields: {
                'theaters.film_schedules': {
                  $map: {
                    input: '$theaters.film_schedules',
                    in: {
                      _id: '$$this._id',
                      time_start: '$$this.time_start',
                      time_end: '$$this.time_end',
                      film_id: '$$this.film_id',
                      theater_id: '$$this.theater_id',
                      room_id: '$$this.room_id',
                      dayOfWeek: {$dayOfWeek: '$$this.time_start'}
                    }
                  }
                }
              }
            },
            {$sort: {'theaters.film_schedules.time_start': -1}},

            {
              $group: {
                _id: '$_id',
                theaters: {
                  $push: '$theaters'
                }
              }
            }
          ],
          day5: [
            {
              $lookup: {
                from: 'film_schedules',
                let: {
                  film_id: '$_id',
                  theaters_id: '$theaters._id',
                  is_deleted: false
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
                            $eq: ['$is_deleted', '$$is_deleted']
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
                as: 'theaters.film_schedules'
              }
            },

            {
              $addFields: {
                'theaters.film_schedules': {
                  $map: {
                    input: '$theaters.film_schedules',
                    in: {
                      _id: '$$this._id',
                      time_start: '$$this.time_start',
                      time_end: '$$this.time_end',
                      film_id: '$$this.film_id',
                      theater_id: '$$this.theater_id',
                      room_id: '$$this.room_id',
                      dayOfWeek: {$dayOfWeek: '$$this.time_start'}
                    }
                  }
                }
              }
            },
            {$sort: {'theaters.film_schedules.time_start': -1}},

            {
              $group: {
                _id: '$_id',
                theaters: {
                  $push: '$theaters'
                }
              }
            }
          ],
          day6: [
            {
              $lookup: {
                from: 'film_schedules',
                let: {
                  film_id: '$_id',
                  theaters_id: '$theaters._id',
                  is_deleted: false
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
                            $eq: ['$is_deleted', '$$is_deleted']
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
                as: 'theaters.film_schedules'
              }
            },

            {
              $addFields: {
                'theaters.film_schedules': {
                  $map: {
                    input: '$theaters.film_schedules',
                    in: {
                      _id: '$$this._id',
                      time_start: '$$this.time_start',
                      time_end: '$$this.time_end',
                      film_id: '$$this.film_id',
                      theater_id: '$$this.theater_id',
                      room_id: '$$this.room_id',
                      dayOfWeek: {$dayOfWeek: '$$this.time_start'}
                    }
                  }
                }
              }
            },
            {$sort: {'theaters.film_schedules.time_start': -1}},

            {
              $group: {
                _id: '$_id',
                theaters: {
                  $push: '$theaters'
                }
              }
            }
          ],
          day7: [
            {
              $lookup: {
                from: 'film_schedules',
                let: {
                  film_id: '$_id',
                  theaters_id: '$theaters._id',
                  is_deleted: false
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
                            $eq: ['$is_deleted', '$$is_deleted']
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
                as: 'theaters.film_schedules'
              }
            },

            {
              $addFields: {
                'theaters.film_schedules': {
                  $map: {
                    input: '$theaters.film_schedules',
                    in: {
                      _id: '$$this._id',
                      time_start: '$$this.time_start',
                      time_end: '$$this.time_end',
                      film_id: '$$this.film_id',
                      theater_id: '$$this.theater_id',
                      room_id: '$$this.room_id',
                      dayOfWeek: {$dayOfWeek: '$$this.time_start'}
                    }
                  }
                }
              }
            },
            {$sort: {'theaters.film_schedules.time_start': -1}},

            {
              $group: {
                _id: '$_id',
                theaters: {
                  $push: '$theaters'
                }
              }
            }
          ]
        }
      },
      {$unwind: '$film'},
      {$unwind: '$day1'},
      {$unwind: '$day1'},
      {$unwind: '$day2'},
      {$unwind: '$day3'},
      {$unwind: '$day4'},
      {$unwind: '$day5'},
      {$unwind: '$day6'},
      {$unwind: '$day7'},

      {
        $unset: [
          'day1._id',
          'day2._id',
          'day3._id',
          'day4._id',
          'day5._id',
          'day6._id',
          'day7._id'
        ]
      }
    ]);
  },

  getNowShowing: async function (lambda) {
    return await Collection.aggregate([
      {$match: {is_deleted: false}},
      {
        $unset: [
          'is_deleted',
          'created_at',
          'updated_at',
          'countries',
          'actors',
          'is_blockbuster',
          'directors'
        ]
      },
      {
        $lookup: {
          from: 'film_schedules',
          let: {
            film_id: '$_id',
            is_deleted: false
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
                      $eq: ['$is_deleted', '$$is_deleted']
                    },
                    {
                      $gte: ['$time_start', lambda.conditions.time_start]
                    },
                    {
                      $lte: ['$time_start', lambda.conditions.time_end7]
                    }
                  ]
                }
              }
            }
          ],
          as: 'film_schedules'
        }
      },
      {
        $match: {
          $expr: {$gt: [{$size: '$film_schedules'}, 0]}
        }
      },
      {$unset: ['film_schedules']},
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
          'category_ids',
          'categories.is_deleted',
          'categories.created_at',
          'categories.updated_at'
        ]
      }
    ]);
  },

  getNowShowing_Favourite: async function (lambda) {
    return await Collection.aggregate([
      {
        // $match: {
        //   category_ids: {
        //     $in: lambda.categories
        //   }
        // }
        $match: {
          $and: [
            {is_deleted: false},
            {
              category_ids: {
                $in: lambda.categories
              }
            }
          ]
        }
      },
      {
        $unset: [
          'is_deleted',
          'created_at',
          'updated_at',
          'countries',
          'actors',
          'is_blockbuster',
          'directors'
        ]
      },
      {
        $lookup: {
          from: 'film_schedules',
          let: {
            film_id: '$_id',
            is_deleted: false
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
                      $eq: ['$is_deleted', '$$is_deleted']
                    },
                    {
                      $gte: ['$time_start', lambda.conditions.time_start]
                    },
                    {
                      $lte: ['$time_start', lambda.conditions.time_end7]
                    }
                  ]
                }
              }
            }
          ],
          as: 'film_schedules'
        }
      },
      {
        $match: {
          $expr: {$gt: [{$size: '$film_schedules'}, 0]}
        }
      },
      {$unset: ['film_schedules']},
      // {
      //   $lookup: {
      //     from: 'categories',
      //     localField: 'category_ids',
      //     foreignField: '_id',
      //     as: 'categories'
      //   }
      // },
      {$unwind: '$category_ids'},
      {
        $lookup: {
          from: 'categories',
          let: {
            category_ids: '$category_ids',
            is_deleted: false
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: ['$_id', '$$category_ids']
                    },
                    {
                      $eq: ['$is_deleted', '$$is_deleted']
                    }
                  ]
                }
              }
            }
          ],
          as: 'categories'
        }
      },
      {$unwind: '$categories'},
      {
        $group: {
          _id: '$_id',
          name: {
            $first: '$name'
          },
          trailer: {
            $first: '$trailer'
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
          rate_average: {
            $first: '$rate_average'
          },
          rate_count: {
            $first: '$rate_count'
          },
          imdb: {
            $first: '$imdb'
          },
          digitals: {
            $first: '$digitals'
          },
          url_avatar: {
            $first: '$url_avatar'
          },
          url_background: {
            $first: '$url_background'
          },
          categories: {
            $addToSet: '$categories'
          }
        }
      },
      {
        $unset: [
          'category_ids',
          'categories.is_deleted',
          'categories.created_at',
          'categories.updated_at'
        ]
      }
    ]);
  }
};
