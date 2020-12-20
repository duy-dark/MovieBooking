const mongoose = require('mongoose');
// validator no insert row when table has had theater_id and time_start
let filmScheduleSchema = new mongoose.Schema(
  {
    film_id: String,
    time_start: Date,
    time_end: Date,
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
  findByLambda: async function (lambda) {
    return await FilmShedules.find(lambda);
  },
  createByLambda: async function (lambda) {
    return await FilmShedules.insertMany(lambda);
  },
  updateByLambda: async function (id, lambda) {
    return await FilmShedules.updateOne(id, lambda);
  }
};
