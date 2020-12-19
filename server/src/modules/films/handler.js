let Film = require('./model');
const resSuccess = require('../../responses/res-success');
const {omitBy, isNil} = require('lodash');
const moment = require('moment');

const getAll = async () => {
  try {
    let films = await Film.findByLambda();
    return resSuccess(films);
  } catch (error) {
    return error;
  }
};

const findById = async (id) => {
  try {
    let films = await Film.findByLambda({_id: id});
    return resSuccess(films[0]);
  } catch (error) {
    return error;
  }
};

const postCreate = async (params) => {
  try {
    let entity = {
      name: params.name || undefined,
      content: params.content || undefined,
      countries: params.countries || undefined,
      long_time: params.long_time || undefined,
      start_date: params.start_date || undefined,
      directors: params.directors || undefined,
      rates: params.rates || undefined,
      rate_count: params.rate_count || undefined,
      actors: params.actors || undefined,
      digitals: params.digitals || undefined,
      is_deleted: false,
      created_at: moment.now(),
      updated_at: moment.now()
    };
    console.log('helo');
    let film = await Film.createByLambda(entity);

    console.log('params: ', params);
    return resSuccess(film);
  } catch (error) {
    return error;
  }
};

const putUpdate = async (id, params) => {
  try {
    let entity = {
      name: params.name || undefined,
      content: params.content || undefined,
      countries: params.countries || undefined,
      long_time: params.long_time || undefined,
      start_date: params.start_date || undefined,
      directors: params.directors || undefined,
      rates: params.rates || undefined,
      rate_count: params.rate_count || undefined,
      actors: params.actors || undefined,
      digitals: params.digitals || undefined,
      updated_at: moment.now()
    };

    entity = omitBy(entity, isNil);

    let film = await Film.updateByLambda({_id: id}, entity);
    return resSuccess(film);
  } catch (error) {
    return error;
  }
};

const deleteData = async (id) => {
  try {
    let entity = {
      is_deleted: true
    };
    let film = await Film.updateByLambda({_id: id}, entity);
    return resSuccess(film);
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAll,
  findById,
  postCreate,
  putUpdate,
  deleteData
};
