let Model = require('./model');
let ScheduleModel = require('../film_schedules/model');
const resSuccess = require('../../responses/res-success');
const {omitBy, isNil} = require('lodash');
const moment = require('moment');
const {transporter, contentMail, contentCode} = require('../../util/mail');
const {nexmo, sendSMS} = require('../../util/sms');
const shortid = require('shortid');

const getList = async (params) => {
  try {
    let lambda = {
      conditions: {...params, is_deleted: false},
      views: {
        _id: 1,
        code: 1,
        count: 1,
        booking_time: 1,
        cost: 1,
        customer_id: 1,
        film_schedule_id: 1,
        voucher_id: 1,
        seats: 1,
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
        code: 1,
        count: 1,
        booking_time: 1,
        cost: 1,
        customer_id: 1,
        seats: 1,
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
    let code = shortid.generate().toUpperCase();
    let lambda = {
      code: code,
      count: params.count || undefined,
      booking_time: moment(params.booking_time) || undefined,
      cost: params.cost || undefined,
      customer_id: require('mongodb').ObjectId(params.customer_id) || undefined,
      film_schedule_id:
        require('mongodb').ObjectId(params.film_schedule_id) || undefined,
      voucher_id: require('mongodb').ObjectId(params.voucher_id) || undefined,
      seats: params.seats || undefined,
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
        code: 1,
        count: 1,
        booking_time: 1,
        cost: 1,
        customer_id: 1,
        seats: 1,
        email: 1,
        voucher_id: 1,
        phone_number: 1,
        payment: 1,
        film_schedules: 1,
        customers: 1,
        room: 1
      }
    };

    let ticketView = await Model.getDetail(view);

    let film = await require('../films/model').findByLambda({
      conditions: {_id: ticketView[0].film_schedules.film_id}
    });
    console.log('film:', film[0]);

    let theater = await require('../theaters/model').findByLambda({
      conditions: {_id: ticketView[0].film_schedules.theater}
    });
    ticketView[0].film_schedules.theater = theater[0].name;
    let seats = ticketView[0].seats.toString();
    let timeStart = moment(ticketView[0].film_schedules.time_start).format(
      'DD/MM/YYYY, HH:mm'
    );
    let time_end = moment(ticketView[0].film_schedules.time_end).format(
      'DD/MM/YYYY, HH:mm'
    );

    let room = await require('../rooms/handler').findById(
      ticketView[0].film_schedules.room_id
    );

    const objSender = {
      id: ticketView[0]._id,
      code: code,
      film: film[0].name,
      address: theater[0].address,
      seats: seats,
      count: ticketView[0].count,
      cost: ticketView[0].cost,
      customers: ticketView[0].customers.name,
      phone_number: ticketView[0].phone_number.toString(),
      payment: ticketView[0].payment,
      time_start: timeStart,
      time_end: time_end,
      theater: ticketView[0].film_schedules.theater,
      room: room.data.name
    };

    console.log('objSender:', objSender);

    let mainOptions = {
      // thiết lập đối tượng, nội dung gửi mail
      from: 'doantotnghiepthang9@gmail.com',
      to: params.email,
      generateTextFromHTML: true,
      subject: 'Đặt vé thành công',
      html: contentMail(objSender) //Nội dung html mình đã tạo trên kia :))
    };

    console.log('Bat dau gui email');
    let rs = await transporter.sendMail(mainOptions, (err, info) => {
      if (err) {
        console.log('err:', err);
        throw {
          status: 204,
          detail: 'not send mail'
        };
      }
      console.log('info:', info);
      smtpTransport.close();
    });

    // let result = await sendSMS(objSender);
    // console.log('result sms', result);
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
        booking_time: params.booking_time || undefined,
        cost: params.cost || undefined,
        customer_id:
          require('mongodb').ObjectId(params.customer_id) || undefined,
        film_schedule_id:
          require('mongodb').ObjectId(params.film_schedule_id) || undefined,
        voucher_id: require('mongodb').ObjectId(params.voucher_id) || undefined,
        seats: params.seats || undefined,
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
