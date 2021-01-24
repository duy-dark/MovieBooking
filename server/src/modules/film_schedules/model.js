const mongoose = require('mongoose');

let schema = new mongoose.Schema(
  {
    time_start: Date,
    time_end: Date,
    film_id: require('mongodb').ObjectId,
    theater_id: require('mongodb').ObjectId,
    room: String,
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
  },

  getFilmToDay: async function (lambda) {
    return await Collection.aggregate([
      // {
      //   $match: {
      //     time_start: {
      //       $gte: lambda.conditions.time_start,
      //       $lte: lambda.conditions.time_end
      //     }
      //   }
      // },
      {
        $lookup: {
          from: 'films',
          localField: 'film_id',
          foreignField: '_id',
          as: 'film&schedule'
        }
      },
      {
<<<<<<< HEAD
        //$addFields: {
        // theaters: {
        //   $map: {
        //     input: '$theaters',
        //     in: {
        //       theater_id: '$$this._id'
        //       //name: '$$this.name'
        //     }
        //   }
        // }

        $lookup: {
          from: 'theaters',
          localField: 'theater_id',
          foreignField: '_id',
          as: 'theater&schedule'
        }
        //}
=======
        $addFields: {
          films: {
            $map: {
              input: '$films',
              in: {
                film_id: '$$this._id',
                name: '$$this.name',
                schedules: [
                  {
                    schedule_id: '$$ROOT._id',
                    film_id: '$$ROOT.film_id',
                    theater_id: '$$ROOT.theater_id',
                    time_start: '$$ROOT.time_start',
                    time_end: '$$ROOT.time_end',
                    room: '$$ROOT.room'
                  }
                ]
              }
            }
          }
        }
      },

      {
        // $project: lambda.views
        $group: {
          _id: {
            theater: '$theaters',
            films: '$films',
            schedules: [
              {
                schedule_id: '$$ROOT._id',
                film_id: '$$ROOT.film_id',
                theater_id: '$$ROOT.theater_id',
                time_start: '$$ROOT.time_start',
                time_end: '$$ROOT.time_end',
                room: '$$ROOT.room'
              }
            ]
          }
        }
      },
      {
        $group: {
          _id: '$_id.theater',
          films: {
            $push: {
              films: '$_id.films'
              // schedules1: [
              //   {
              //     schedules2: '$$ROOT._id.schedules'
              //   }
              // ]
            }
          }
        }
>>>>>>> caa021805793b3e1523e1b85bfc777a2fe97b900
      }

      // {
      //   $lookup: {
      //     from: 'films',
      //     localField: 'film_id',
      //     foreignField: '_id',
      //     as: 'films'
      //   }
      // },
      // {
      //   $addFields: {
      //     films: {
      //       $map: {
      //         input: '$films',
      //         in: {
      //           film_id: '$$this._id',
      //           name: '$$this.name'
      //           // schedules: [
      //           //   {
      //           //     time_start: '$$ROOT.time_start',
      //           //     time_end: '$$ROOT.time_end'
      //           //   }
      //           // ]
      //         }
      //       }
      //     }
      //   }
      // },

      // {
      //   // $project: lambda.views
      //   $group: {
      //     _id: {
      //       theater: '$theaters',
      //       films: '$films',
      //       schedules: [
      //         {
      //           schedule_id: '$$ROOT._id',
      //           time_start: '$$ROOT.time_start',
      //           time_end: '$$ROOT.time_end'
      //         }
      //       ]
      //     }
      //   }
      // }
      // {
      //   $group: {
      //     _id: '$_id.theater',
      //     films: {
      //       $push: {
      //         $group: {
      //           films: '$_id.films',
      //           schedules: {
      //             $push: {
      //               schedules: '$._id.schedules'
      //             }
      //           }
      //         }
      //       }
      //     }
      //   }
      // }
      // {
      //   // $project: lambda.views
      //   $group: {
      //     _id: '$_id',
      //     theater: {
      //       $first: '$theaters'
      //     },
      //     films: {
      //       $push: '$films'
      //     },
      //     schedule: {
      //       $push: {
      //         schedule_id: '$$ROOT._id',
      //         film_id: '$$ROOT.film_id',
      //         theater_id: '$$ROOT.theater_id',
      //         time_start: '$$ROOT.time_start',
      //         time_end: '$$ROOT.time_end'
      //       }
      //     }
      //   }
      // },
      // {
      //   $group: {
      //     theater: '$theater',
      //     films: {
      //       $push: {
<<<<<<< HEAD
      //         filmss: '$$ROOT.films',
      //         schedules: {
      //           time_start: '$$ROOT.time_start',
      //           time_end: '$$ROOT.time_end'
      //         },
      //         $group: {
      //           _id: '$_id.filmss',
      //           schedules: {
      //             $push: {
      //               time_start: '$$ROOT.time_start',
      //               time_end: '$$ROOT.time_end'
      //             }
      //           }
      //         }
      //       }
      //     }
      //   }
      // }
      // {
      //   $group: {
      //     _id: '$_id.films.filmss',
      //     schedule: {
      //       $push: {
      //         schedule: '$_id.schedule'
=======
      //         films: '$films'
      //         // schedules: [
      //         //   {
      //         //     schedules: '$$ROOT._id.schedules'
      //         //   }
      //         // ]
>>>>>>> caa021805793b3e1523e1b85bfc777a2fe97b900
      //       }
      //     }
      //   }
      // }
    ]);
  },

  getFilm7Day: async function (lambda) {
    return await Collection.aggregate([
      {
        $match: {
          time_start: {
            $gte: lambda.gte_match,
            $lte: lambda.lte_match
          },
          end_time: {$gte: lambda.gte_end, $lte: lambda.lte_end}
        }
      },
      {
        $project: lambda.views
      }
    ]);
  }
};
