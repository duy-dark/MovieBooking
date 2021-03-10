let Model = require('./model');
let ScheduleModel = require('../film_schedules/model');
const resSuccess = require('../../responses/res-success');
const {omitBy, isNil} = require('lodash');
const moment = require('moment');

const shortid = require('shortid');

const getList = async (params) => {
  try {
    let lambda = {
      conditions: {...params, is_deleted: false},
      views: {
        _id: 1,
        code: 1,
        count: 1,
        cost: 1,
        customer_id: 1,
        film_schedule_id: 1,
        voucher_id: 1,
        seats: 1,
        email: 1,
        phone_number: 1,
        payment: 1,
        momo_payment: 1,
        direct_payment: 1,
        is_paid: 1
      }
    };
    let data = await Model.findByLambda(lambda);
    return resSuccess(data);
  } catch (error) {
    throw {status: 400, detail: error};
  }
};

const getListDetail = async (params) => {
  try {
    let lambda = {
      conditions: {...params, is_deleted: false},
      views: {
        _id: 1,
        code: 1,
        count: 1,
        cost: 1,
        customer_id: 1,
        film_schedule_id: 1,
        voucher_id: 1,
        seats: 1,
        email: 1,
        phone_number: 1,
        payment: 1,
        momo_payment: 1,
        direct_payment: 1,
        is_paid: 1
      }
    };
    let data = await Model.getListDetail(lambda);
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
        code: 1,
        count: 1,
        cost: 1,
        customer_id: 1,
        seats: 1,
        email: 1,
        voucher_id: 1,
        phone_number: 1,
        payment: 1,
        film_schedules: 1,
        customers: 1,
        momo_payment: 1,
        direct_payment: 1,
        is_paid: 1
      }
    };
    let data = await Model.getDetail(lambda);
    // console.log(data);
    if (data.length > 0) {
      if (data[0].film_schedules) {
        let theater = await require('../theaters/model').findByLambda({
          conditions: {_id: data[0].film_schedules.theater_id}
        });
        data[0].film_schedules.theater = theater[0].name;
        data[0].film_schedules.address = theater[0].address;

        let film = await require('../films/model').findByLambda({
          conditions: {_id: data[0].film_schedules.film_id}
        });
        data[0].film_schedules.film = film[0].name;

        let room = await require('../rooms/model').findByLambda({
          conditions: {_id: data[0].film_schedules.room_id}
        });
        data[0].film_schedules.room = room[0].name;
      }
    }

    return resSuccess(data[0]);
  } catch (error) {
    console.log(error);
    throw {status: 400, detail: error};
  }
};

const postCreate = async (params) => {
  try {
    let code = shortid.generate().toUpperCase();
    let lambda = {
      code: code,
      count: params.count || undefined,
      cost: params.cost || undefined,
      customer_id: params.customer_id || undefined,
      film_schedule_id: params.film_schedule_id || undefined,
      film_id: params.film_id || undefined,
      theater_id: params.theater_id || undefined,
      voucher_id: params.voucher_id || undefined,
      seats: params.seats || undefined,
      email: params.email || undefined,
      phone_number: params.phone_number || undefined,
      payment: params.payment || undefined,
      momo_payment: params.momo_payment || false,
      direct_payment: params.direct_payment || false,
      is_paid: false,
      is_deleted: false,
      created_at: moment.now(),
      updated_at: moment.now()
    };
    let data = await Model.createByLambda(lambda);
    return resSuccess(data[0]);
  } catch (error) {
    console.log('error booking', error);
    throw error;
  }
};

const putUpdate = async (id, params) => {
  try {
    let lambda = {
      conditions: {_id: id, is_deleted: false},
      params: {
        code: params.code || undefined,
        count: params.count || undefined,
        cost: params.cost || undefined,
        customer_id: params.customer_id || undefined,
        film_schedule_id: params.film_schedule_id || undefined,
        film_id: params.film_id || undefined,
        theater_id: params.theater_id || undefined,
        voucher_id: params.voucher_id || undefined,
        seats: params.seats || undefined,
        email: params.email || undefined,
        phone_number: params.phone_number || undefined,
        payment: params.payment || undefined,
        momo_payment: params.momo_payment || undefined,
        direct_payment: params.direct_payment || undefined,
        is_paid: params.is_paid || undefined,
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

const getTicketBySchedule = async (film_schedule_id) => {
  try {
    console.log('film_schedule_id', film_schedule_id);
    let conditions = {
      film_schedule_id: film_schedule_id,
      is_paid: true,
      is_deleted: false
    };
    let data = await Model.getTicketBySchedule(conditions);
    let arr = data.map((item) => item.seats);

    let lambda = {
      conditions: {_id: film_schedule_id, is_deleted: false},
      views: {
        _id: 1,
        time_start: 1,
        time_end: 1,
        film_id: 1,
        theater_id: 1,
        // room_id: 1,
        room: 1
      }
    };

    let seatsMap = await ScheduleModel.getRoomInfoForTicket(lambda);

    return resSuccess({
      seatsExisted: arr,
      seatsMap: seatsMap[0].room.seats,
      room_name: seatsMap[0].room.name
    });
  } catch (error) {
    throw {status: 400, detail: error};
  }
};
module.exports = {
  getList,
  getListDetail,
  findById,
  postCreate,
  putUpdate,
  deleteData,
  getTicketBySchedule
};
