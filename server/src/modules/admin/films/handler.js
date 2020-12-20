let Film = require('../../models/film.model');
let Film_schedules = require('../../models/film_schedules');
const resSuccess = require('./../../response/res-success');
const {omitBy, isNil} = require('lodash');
const moment = require('moment');

const createFilm = async (movie) => {
  try {
    let entity = {
      name: movie.name,
      content: movie.content,
      countries: movie.countries,
      long_time: movie.long_time,
      start_date: movie.start_date,
      directors: movie.directors,
      actors: movie.actors ,
      digitals: movie.digitals,
      is_deleted: false
      // updated_at: moment().format('DD/MM/YYYY HH:mm:ss')
    };
    let films = await Film.createByLambda(entity);

    let entityschedule = {
      film_id: films[0]._id,
      time_start: movie.time_start,
      time_end: movie.time_end,
      theater_id: movie.theater_id,
    }
    let s = await Film_schedules.createByLambda(entityschedule);
    
    return {
      id: films[0]._id,
      ...movie
    };
  } catch (error) {
    return error;
  }
};

module.exports = {
  createFilm
};
