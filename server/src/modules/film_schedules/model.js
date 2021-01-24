const mongoose = require('mongoose');

let schema = new mongoose.Schema(
  {
    time_start: Date,
    time_end: Date,
    film_id: require('mongodb').ObjectId,
    theater_id: require('mongodb').ObjectId,
    room: require('mongodb').ObjectId,
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
      //     filmss: {
      //       $push: {
      //         filmss: '$_id.films'
      //         // schedules: {
      //         //   time_start: '$$ROOT.time_start',
      //         //   time_end: '$$ROOT.time_end'
      //         // }
      //       }
      //     }
      //   }
      // }
      // {
      //   $group: {
      //     _id: '$filmss.filmss',
      //     filmss: {
      //       $push: {
      //         schedules: '$ROOT'
      //         // schedules: {
      //         //   time_start: '$$ROOT.time_start',
      //         //   time_end: '$$ROOT.time_end'
      //         // }
      //       }
      //     }
      //   }
      // }

      // {
      //   $group: {
      //     _id: '$theater',
      //     films: {$push: '$$ROOT.films'}
      //   }
      // }

      // {
      //   $group: {
      //     _id: '$theater',
      //     films: {
      //       $push: {
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
