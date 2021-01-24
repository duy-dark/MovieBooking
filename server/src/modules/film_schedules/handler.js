let Model = require('./model');
const resSuccess = require('../../responses/res-success');
const {omitBy, isNil} = require('lodash');
const moment = require('moment');

const getNowShowing = async (params) => {
  try {
    let data = await Model.getNowShowing(params);
    return resSuccess(data);
  } catch (error) {
    return error;
  }
};

const getList = async (params) => {
  try {
    let lambda = {
      conditions: {...params, is_deleted: false},
      views: {
        _id: 1,
        time_start: 1,
        time_end: 1,
        film_id: 1,
        theater_id: 1,
        room: 1
      }
    };
    let data = await Model.findByLambda(lambda);
    return resSuccess(data);
  } catch (error) {
    throw {status: 400, detail: error};
  }
};

const findById = async (id) => {
  try {
    let lambda = {
      conditions: {_id: id, is_deleted: false},
      views: {
        _id: 1,
        time_start: 1,
        time_end: 1,
        film_id: 1,
        theater_id: 1,
        room: 1
      }
    };
    let data = await Model.findByLambda(lambda);
    return resSuccess(data[0]);
  } catch (error) {
    throw {status: 400, detail: error};
  }
};

const getFilmToDay = async () => {
  try {
    let time_start = new Date(moment().add(7, 'hour'));

    let hour = new Date(moment()).getHours();
    let date = new Date(moment().add(7, 'hour').add(1, 'days')).getDate();
    if (hour > 17) {
      date -= 1;
    }
    let month = new Date(moment().add(7, 'hour').add(1, 'days')).getMonth();
    let year = new Date(moment().add(7, 'hour').add(1, 'days')).getFullYear();

    let time_end = new Date(
      moment(
        `${year}-${month > 8 ? month + 1 : '0' + (month + 1)}-${
          date > 9 ? date : '0' + date
        }`,
        moment.ISO_8601
      ).add(7, 'hour')
    );

    console.log('time_start: ', time_start);
    console.log('time_end:   ', time_end);
    console.log('date:       ', date);
    console.log('month:      ', month + 1);
    console.log('year:       ', year);

    let lambda = {
      conditions: {
        time_start: time_start,
        time_end: time_end,
        is_deleted: false
      },
      views: {
        _id: 1,
        time_start: 1,
        time_end: 1,
        // film_id: 1,
        films: 1,
        // theater_id: 1,
        theater: 1
        // room: 1
      }
    };

    let data = await Model.getFilmToDay(lambda);
    return resSuccess(data);
  } catch (error) {
    // throw {status: 400, detail: error};
    throw {status: 400, detail: error};
  }
};

const getFilm7Day = async (film_id) => {
  try {
    let lambda = {
      conditions: {film_id: film_id, is_deleted: false},
      views: {
        _id: 1,
        time_start: 1,
        time_end: 1,
        film_id: 1,
        theater_id: 1,
        room: 1
      }
    };
    let data = await Model.findByLambda(lambda);
    return resSuccess(data);
  } catch (error) {
    throw {status: 400, detail: error};
  }
};

const postCreate = async (params) => {
  try {
    let lambda = {
      time_start: params.time_start || undefined,
      time_end: params.time_end || undefined,
      film_id: params.film_id || undefined,
      theater_id: params.theater_id || undefined,
      room: params.room || undefined,
      is_deleted: false,
      created_at: moment.now(),
      updated_at: moment.now()
    };
    let data = await Model.createByLambda(lambda);
    return resSuccess(data);
  } catch (error) {
    throw {status: 400, detail: error};
  }
};

const putUpdate = async (id, params) => {
  try {
    let lambda = {
      conditions: {_id: id, is_deleted: false},
      params: {
        time_start: params.time_start || undefined,
        time_end: params.time_end || undefined,
        film_id: params.film_id || undefined,
        theater_id: params.theater_id || undefined,
        room: params.room || undefined,
        updated_at: moment.now()
      }
    };
    lambda.params = omitBy(lambda.params, isNil);
    let data = await Model.updateByLambda(lambda);
    return resSuccess(data);
  } catch (error) {
    throw {status: 400, detail: error};
  }
};

const deleteData = async (id) => {
  try {
    let lambda = {
      conditions: {_id: id, is_deleted: false},
      params: {
        is_deleted: true,
        updated_at: moment.now()
      }
    };
    let data = await Model.updateByLambda(lambda);
    return resSuccess(data);
  } catch (error) {
    throw {status: 400, detail: error};
  }
};

module.exports = {
  getNowShowing,
  getList,
  findById,
  getFilmToDay,
  getFilm7Day,
  postCreate,
  putUpdate,
  deleteData
};
