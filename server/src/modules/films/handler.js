let Model = require('./model');
const resSuccess = require('../../responses/res-success');
const {omitBy, isNil} = require('lodash');
const moment = require('moment');

const getAll = async () => {
  try {
    let data = await Model.findByLambda();
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
    let data = await Model.createByLambda(entity);

    return resSuccess(data);
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

const getComingSoon = async function (lamda) {
  var Film = mongoose.model('Film', filmSchema, 'films');
  var timezone = Date.now();
  var timeZ = new Date(moment(timezone).format());

  return await Film.aggregate([
    {
      $match: {
        start_date: {
          $gte: new Date(moment(timezone).format()),
          $lte: new Date(moment('31/12/9999').format())
        }
      }
    }
  ]);
};

const getNowShowing = async (params) => {
  try {
    let data = await Model.getNowShowing(params);
    return resSuccess(data);
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAll,
  findById,
  postCreate,
  putUpdate,
  deleteData,
  getComingSoon,
  getNowShowing
};
