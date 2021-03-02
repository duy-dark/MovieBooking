let Model = require('./model');
const resSuccess = require('../../responses/res-success');
const {omitBy, isNil} = require('lodash');
const moment = require('moment');

const getList = async (params) => {
  try {
    let conditions = {...params, is_deleted: false};
    let is_mobile = params.is_mobile;

    delete conditions.is_mobile;
    delete conditions.limit;
    console.log('conditions', conditions);
    let lambda = {
      conditions: conditions,
      views: {
        _id: 1,
        film_id: 1,
        customer_id: 1,
        content: 1,
        rate: 1
      },
      limit: params.limit * 5 || 100000
    };
    // console.log('type:', typeof lambda.conditions._id);
    // console.log('_id:', lambda.conditions);
    let data = {};
    console.log(is_mobile);
    if (is_mobile == 1) {
      data = await Model.findByLambda_detail_mobile(lambda);
    } else {
      data = await Model.findByLambda_detail(lambda);
    }
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
        film_id: 1,
        customer_id: 1,
        content: 1,
        rate: 1
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
      film_id: params.film_id || undefined,
      customer_id: params.customer_id || undefined,
      content: params.content || undefined,
      rate: params.rate || undefined,
      is_deleted: false,
      created_at: moment.now(),
      updated_at: moment.now()
    };
    // console.log('lambda:', lambda);
    let data = await Model.createByLambda(lambda);
    console.log('data:', data);
    if (data[0]._id) {
      let film = await require('../films/model').findByLambda({
        conditions: {_id: params.film_id, is_deleted: false}
      });

      let ObjectRates = {...film[0].rates};

      let rate = film[0].rates[`star${params.rate}`] + 1;
      ObjectRates[`star${params.rate}`] = rate;
      console.log('ObjectRates', ObjectRates);

      let rate_count = film[0].rate_count + 1;

      let rate_sum =
        ObjectRates.star1 * 1 +
        ObjectRates.star2 * 2 +
        ObjectRates.star3 * 3 +
        ObjectRates.star4 * 4 +
        ObjectRates.star5 * 5 +
        ObjectRates.star6 * 6 +
        ObjectRates.star7 * 7 +
        ObjectRates.star8 * 8 +
        ObjectRates.star9 * 9 +
        ObjectRates.star10 * 10;

      let rate_average = rate_sum / rate_count;

      let updateFilmRate = await require('../films/model').updateByLambda({
        conditions: {_id: params.film_id, is_deleted: false},
        params: {
          rates: ObjectRates,
          rate_average: rate_average,
          rate_count: rate_count
        }
      });
    } else {
      throw {status: 400, detail: data};
    }

    // console.log('data:', data);
    let customer = await require('../customers/model').findByLambda({
      conditions: {_id: params.customer_id, is_deleted: false}
    });
    data[0] = {
      ...data[0]._doc,
      customers: customer[0]
    };

    // console.log(data[0]);
    // console.log('customer:', customer);
    return resSuccess({comment: data[0]});
  } catch (error) {
    throw {status: 400, detail: error};
  }
};

const putUpdate = async (id, params) => {
  try {
    let lambda = {
      conditions: {_id: id, is_deleted: false},
      params: {
        film_id: params.film_id || undefined,
        customer_id: params.customer_id || undefined,
        content: params.content || undefined,
        rate: params.rate || undefined,
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
