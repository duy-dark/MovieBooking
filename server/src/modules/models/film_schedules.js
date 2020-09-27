const mongoose = require('mongoose');
// validator no insert row when table has had theater_id and time_start
let filmScheduleSchema = new mongoose.Schema(
  {
    film_id: String,
    time_start: Date,
    end_time: Date,
    theater_id: String,
    is_deleted: Boolean,
    updated_at: Date
  },
  {versionKey: false}
);

let FilmShedules = mongoose.model(
  'FilmShedules',
  filmScheduleSchema,
  'film_schedules'
);

module.exports = {
  findByLamda: async function (lamda) {
    return await FilmShedules.find(lamda);
  },
  createByLamda: async function (lamda) {
    return await FilmShedules.insertMany(lamda);
  },
  updateByLamda: async function (id, lamda) {
    return await FilmShedules.updateOne(id, lamda);
  }
};
