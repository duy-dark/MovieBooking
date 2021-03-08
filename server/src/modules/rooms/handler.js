let Model = require('./model');
const resSuccess = require('../../responses/res-success');
const {omitBy, isNil} = require('lodash');
const moment = require('moment');

const getList = async (params) => {
  try {
    let lambda = {
      conditions: {...params, is_deleted: false},
      views: {
        _id: 1,
        name: 1,
        type: 1,
        theater_id: 1,
        seats: 1
      }
    };
    console.log('lambda', lambda);
    let data = await Model.getDetailByLambda(lambda);
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
        name: 1,
        count_of_seat: 1,
        type_room: 1,
        theater_id: 1,
        seats: 1
      }
    };
    let data = await Model.getDetailByLambda(lambda);
    return resSuccess(data[0]);
  } catch (error) {
    throw {status: 400, detail: error};
  }
};

const postCreate = async (params) => {
  try {
    let lambda = {
      name: params.name || undefined,
      type: params.type || undefined,
      theater_id: params.theater_id || undefined,
      seats: params.seats || undefined,
      is_deleted: false,
      created_at: moment.now(),
      updated_at: moment.now()
    };
    let data = await Model.createByLambda(lambda);
    return resSuccess(data[0]);
  } catch (error) {
    throw {status: 400, detail: error};
  }
};

const putUpdate = async (id, params) => {
  try {
    let lambda = {
      conditions: {_id: id, is_deleted: false},
      params: {
        name: params.name || undefined,
        type: params.type || undefined,
        theater_id: params.theater_id || undefined,
        seats: params.seats || undefined,
        updated_at: moment.now()
      }
    };
    lambda.params = omitBy(lambda.params, isNil);
    let data = await Model.updateByLambda(lambda);
    if (data.ok) {
      let result = await findById(id);
      return result;
    } else {
      throw {status: 400, detail: data};
    }
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
    if (data.ok) {
      let result = await Model.findByLambda({conditions: {_id: id}});
      return resSuccess(result[0]);
    } else {
      throw {status: 400, detail: data};
    }
  } catch (error) {
    throw {status: 400, detail: error};
  }
};

module.exports = {
  getList,
  findById,
  postCreate,
  putUpdate,
  deleteData
};
