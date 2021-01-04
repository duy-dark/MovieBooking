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
      room_id: params.room_id || undefined,
      seat_detail_id: params.seat_detail_id || undefined,
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
      room_id: params.room_id || undefined,
      seat_detail_id: params.seat_detail_id || undefined,
      content: params.content || undefined,
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
