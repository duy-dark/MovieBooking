const Model = require('./model');
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
        phone: 1,
        date_of_birth: 1,
        email: 1,
        gender: 1,
        avatar: 1,
        address: 1
      }
    };
    let data = await Model.findByLambda(lambda);
    if (data.length === 0)
      throw {
        status: 204,
        detail: "Doesn't exist any customer"
      };
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
        phone: 1,
        date_of_birth: 1,
        email: 1,
        gender: 1,
        avatar: 1,
        address: 1
      }
    };
    let data = await Model.findByLambda(lambda);
    if (data.length === 0)
      throw {
        status: 204,
        detail: 'Customer not found'
      };
    return resSuccess(data);
  } catch (error) {
    throw {status: 400, detail: error};
  }
};

const postCreate = async (params) => {
  try {
    let lambda = {
      name: params.name || undefined,
      phone: params.phone || undefined,
      date_of_birth: params.date_of_birth || undefined,
      email: params.email || undefined,
      gender: params.gender || undefined,
      avatar: params.avatar || undefined,
      adress: params.adress || undefined,
      token_gg: params.token_gg || undefined,
      token_zalo: params.token_zalo || undefined,
      is_deleted: false,
      created_at: moment.now(),
      updated_at: moment.now()
    };
    console.log(lambda);
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
        name: params.name || undefined,
        phone: params.phone || undefined,
        date_of_birth: params.date_of_birth || undefined,
        email: params.email || undefined,
        gender: params.gender || undefined,
        avatar: params.avatar || undefined,
        adress: params.adress || undefined,
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
  getList,
  findById,
  postCreate,
  putUpdate,
  deleteData
};
