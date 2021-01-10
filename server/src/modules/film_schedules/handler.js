let Model = require('./model');
const resSuccess = require('../../responses/res-success');
const {omitBy, isNil} = require('lodash');
const moment = require('moment');

const getNowShowing = async (params) => {
  try {
    console.log('helloworld: ', params);
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
        room_id: 1
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
        room_id: 1
      }
    };
    let data = await Model.findByLambda(lambda);
    return resSuccess(data[0]);
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
      room_id: params.room_id || undefined,
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
        room_id: params.room_id || undefined,
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
  postCreate,
  putUpdate,
  deleteData
};
