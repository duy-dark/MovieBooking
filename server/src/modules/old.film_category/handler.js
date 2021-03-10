let Model = require('./model');
const resSuccess = require('../../responses/res-success');
const {omitBy, isNil} = require('lodash');
const moment = require('moment');

const getList = async (params) => {
  try {
    let data = await Model.findByLambda(params);
    return resSuccess(data);
  } catch (error) {
    return error;
  }
};

const findById = async (id) => {
  try {
    let data = await Model.findByLambda({_id: id});
    return resSuccess(data[0]);
  } catch (error) {
    return error;
  }
};

const postCreate = async (params) => {
  try {
    let entity = {
      film_id: params.film_id || undefined,
      category_id: params.category_id || undefined,
      is_deleted: false,
      created_at: moment.now(),
      updated_at: moment.now()
    };
    let data = await Model.createByLambda(entity);
    return resSuccess(data);
  } catch (error) {
    return error;
  }
};

const putUpdate = async (id, params) => {
  try {
    let entity = {
      film_id: params.film_id || undefined,
      category_id: params.category_id || undefined,
      updated_at: moment.now()
    };
    entity = omitBy(entity, isNil);
    let data = await Model.updateByLambda({_id: id}, entity);
    return resSuccess(data);
  } catch (error) {
    return error;
  }
};

const deleteData = async (id) => {
  try {
    let entity = {
      is_deleted: true
    };
    let data = await Model.updateByLambda({_id: id}, entity);
    return resSuccess(data);
  } catch (error) {
    return error;
  }
};

module.exports = {
  getList,
  findById,
  postCreate,
  putUpdate,
  deleteData
};
