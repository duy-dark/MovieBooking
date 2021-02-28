let Model = require('./model');
let ScheduleModel = require('../film_schedules/model');
const resSuccess = require('../../responses/res-success');
const {omitBy, isNil} = require('lodash');
const moment = require('moment');
const {transporter, contentMail, contentCode} = require('../../util/mail');
const {nexmo, sendSMS} = require('../../util/sms');

const getList = async (params) => {
  try {
    let lambda = {
      conditions: {...params, is_deleted: false},
      views: {
        _id: 1,
        count: 1,
        booking_time: 1,
        cost: 1,
        customer_id: 1,
        film_schedule_id: 1,
        voucher_id: 1,
        seat_ids: 1,
        email: 1,
        phone_number: 1,
        payment: 1
      }
    };
    let data = await Model.findByLambda(lambda);
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
        count: 1,
        booking_time: 1,
        cost: 1,
        customer_id: 1,
        seat_ids: 1,
        email: 1,
        voucher_id: 1,
        phone_number: 1,
        payment: 1,
        film_schedules: 1,
        customers: 1
      }
    };
    let data = await Model.getDetail(lambda);

    let theater = await require('../theaters/model').findByLambda({
      conditions: {_id: data[0].film_schedules[0].theater}
    });
    data[0].film_schedules[0].theater = theater[0].name;

    return resSuccess(data[0]);
  } catch (error) {
    throw {status: 400, detail: error};
  }
};

const postCreate = async (params) => {
  try {
    let lambda = {
      count: params.count || undefined,
      booking_time: params.booking_time || undefined,
      cost: params.cost || undefined,
      customer_id: require('mongodb').ObjectId(params.customer_id) || undefined,
      film_schedule_id:
        require('mongodb').ObjectId(params.film_schedule_id) || undefined,
      voucher_id: require('mongodb').ObjectId(params.voucher_id) || undefined,
      seat_ids: params.seat_ids || undefined,
      email: params.email || undefined,
      phone_number: params.phone_number || undefined,
      payment: params.payment || undefined,
      is_deleted: false,
      created_at: moment.now(),
      updated_at: moment.now()
    };

    let data = await Model.createByLambda(lambda);

    let view = {
      conditions: {_id: data[0]._id, is_deleted: false},
      views: {
        _id: 1,
        count: 1,
        booking_time: 1,
        cost: 1,
        customer_id: 1,
        seat_ids: 1,
        email: 1,
        voucher_id: 1,
        phone_number: 1,
        payment: 1,
        film_schedules: 1,
        customers: 1
      }
    };
    let ticketView = await Model.getDetail(view);
    let theater = await require('../theaters/model').findByLambda({
      conditions: {_id: ticketView[0].film_schedules[0].theater}
    });
    ticketView[0].film_schedules[0].theater = theater[0].name;

    let seats = ticketView[0].seat_ids.toString();

    let timeStart = moment(ticketView[0].film_schedules[0].time_start).format(
      'DD/MM/YYYY, HH:mm'
    );

    let time_end = moment(ticketView[0].film_schedules[0].time_end).format(
      'DD/MM/YYYY, HH:mm'
    );

    const objSender = {
      id: ticketView[0]._id,
      seats: seats,
      count: ticketView[0].count,
      cost: ticketView[0].cost,
      customers: ticketView[0].customers[0].name,
      phone_number: ticketView[0].phone_number,
      payment: ticketView[0].payment,
      time_start: timeStart,
      time_end: time_end,
      theater: ticketView[0].film_schedules[0].theater,
      room_id: ticketView[0].film_schedules[0].room_id
    };

    let mainOptions = {
      // thiết lập đối tượng, nội dung gửi mail
      from: 'example@example.com',
      to: params.email,
      subject: 'Đặt vé thành công',
      html: contentMail(objSender) //Nội dung html mình đã tạo trên kia :))
    };
    let result = await sendSMS(objSender);
    console.log('result sms', result);
    let p1 = await transporter.sendMail(mainOptions);
    await Promise.all([p1]).then((row) => {
      let {err, info} = row[0];
      if (err) {
        throw {
          status: 203,
          detail: 'send mail error'
        };
      }
    });

    return resSuccess(data[0]);
  } catch (error) {
    console.log('error booking', error);
    throw {status: 400, detail: error};
  }
};

const putUpdate = async (id, params) => {
  try {
    let lambda = {
      conditions: {_id: id, is_deleted: false},
      params: {
        count: params.count || undefined,
        booking_time: params.booking_time || undefined,
        cost: params.cost || undefined,
        customer_id:
          require('mongodb').ObjectId(params.customer_id) || undefined,
        film_schedule_id:
          require('mongodb').ObjectId(params.film_schedule_id) || undefined,
        voucher_id: require('mongodb').ObjectId(params.voucher_id) || undefined,
        seat_ids: params.seat_ids || undefined,
        email: params.email || undefined,
        phone_number: params.phone_number || undefined,
        payment: params.payment || undefined,
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

const getTicket = async (film_schedule_id) => {
  try {
    let data = await Model.getTicket(film_schedule_id);
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
  findById,
  postCreate,
  putUpdate,
  deleteData,
  getTicket
};
