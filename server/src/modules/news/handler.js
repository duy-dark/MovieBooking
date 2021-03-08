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
        title: 1,
        content: 1,
        film_id: 1,
        created_at: 1,
        updated_at: 1
      }
    };
    let data = await Model.findByLambda(lambda);
    return resSuccess(data);
  } catch (error) {
    throw {status: 203, detail: error};
  }
};

const findById = async (id) => {
  try {
    let lambda = {
      conditions: {_id: id, is_deleted: false},
      views: {
        _id: 1,
        title: 1,
        content: 1,
        film_id: 1,
        created_at: 1,
        updated_at: 1
      }
    };
    let data = await Model.findByLambda(lambda);
    return resSuccess(data[0]);
  } catch (error) {
    throw {status: 203, detail: error};
  }
};

const postCreate = async (params) => {
  try {
    let lambda = {
      title: params.title || undefined,
      content: params.content || undefined,
      film_id: params.film_id || undefined,
      is_deleted: false,
      created_at: moment.now(),
      updated_at: moment.now()
    };
    console.log(lambda);
    let data = await Model.createByLambda(lambda);
    return resSuccess(data[0]);
  } catch (error) {
    throw {status: 203, detail: error};
  }
};

const putUpdate = async (id, params) => {
  try {
    let lambda = {
      conditions: {_id: id, is_deleted: false},
      params: {
        title: params.title || undefined,
        content: params.content || undefined,
        film_id: params.film_id || undefined,
        updated_at: moment.now()
      }
    };
    lambda.params = omitBy(lambda.params, isNil);
    let data = await Model.updateByLambda(lambda);
    if (data.ok) {
      let result = await findById(id);
      return result;
    } else {
      throw {status: 203, detail: data};
    }
  } catch (error) {
    throw {status: 203, detail: error};
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
    throw {status: 203, detail: error};
  }
};

module.exports = {
  getList,
  findById,
  postCreate,
  putUpdate,
  deleteData
};
