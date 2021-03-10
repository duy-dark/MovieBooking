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
        customer_id: 1,
        type: 1,
        coupons_status: 1
      }
    };
    let data = await Model.getDetail(lambda);
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
        customer_id: 1,
        type: 1,
        coupons_status: 1
      }
    };
    let data = await Model.getDetail(lambda);

    return resSuccess(data[0]);
  } catch (error) {
    throw {status: 400, detail: error};
  }
};

const findByCustomer_Id = async (customer_id) => {
  try {
    let lambda = {
      conditions: {
        customer_id: customer_id,
        coupons_status: 1,
        is_deleted: false
      },
      views: {
        _id: 1,
        customer_id: 1,
        type: 1,
        coupons_status: 1
      }
    };
    let time_start = new Date(moment(moment.now()).subtract(7, 'day'));
    console.log('time_start', time_start);
    let data = await Model.getDetailCustomer(lambda);

    data = data.filter((item) => item.created_at > time_start);
    let customer = await require('../customers/model').findByLambda({
      conditions: {_id: customer_id}
    });

    return resSuccess({point: customer[0].point, coupons: data});
  } catch (error) {
    throw {status: 400, detail: error};
  }
};

const postCreate = async (params) => {
  try {
    let point = params.point;
    let lambda = {
      customer_id: params.customer_id || undefined,
      type: params.type || undefined,
      coupons_status: 1,
      is_deleted: false,
      created_at: moment.now(),
      updated_at: moment.now()
    };
    let data = await Model.createByLambda(lambda);
    if (data[0]._id) {
      let update = await require('../customers/model').updateByLambda({
        conditions: {_id: params.customer_id},
        params: {point: point - 5}
      });
    }
    console.log('data', data[0]);
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
        customer_id: params.customer_id || undefined,
        type: params.type || undefined,
        coupons_status: params.coupons_status || undefined,
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

const triggeringCoupon = async (id) => {
  try {
    let lambda = {
      conditions: {_id: id, is_deleted: false},
      params: {
        coupons_status: 2,
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
      let result = await findById(id);
      return result;
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
  findByCustomer_Id,
  postCreate,
  putUpdate,
  triggeringCoupon,
  deleteData
};
