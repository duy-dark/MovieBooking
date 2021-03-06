let Model = require('./model');
const resSuccess = require('../../responses/res-success');
const {omitBy, isNil} = require('lodash');
const moment = require('moment');

const getNowShowing = async () => {
  try {
    let time_start = new Date(moment());

    let date = new Date(moment().add(1, 'days')).getDate();

    let month = new Date(moment().add(1, 'days')).getMonth();
    let year = new Date(moment().add(1, 'days')).getFullYear();

    let time_end1 = new Date(
      moment(
        `${year}-${month > 8 ? month + 1 : '0' + (month + 1)}-${
          date > 9 ? date : '0' + date
        }`,
        moment.ISO_8601
      )
    );

    console.log('time_start: ', time_start);
    console.log('time_end1:   ', time_end1);
    console.log('date:       ', date);
    console.log('month:      ', month + 1);
    console.log('year:       ', year);

    let lambda = {
      conditions: {
        time_start: time_start,
        time_end1: time_end1,
        time_end2: new Date(moment(time_end1).add(1, 'days')),
        time_end3: new Date(moment(time_end1).add(2, 'days')),
        time_end4: new Date(moment(time_end1).add(3, 'days')),
        time_end5: new Date(moment(time_end1).add(4, 'days')),
        time_end6: new Date(moment(time_end1).add(5, 'days')),
        time_end7: new Date(moment(time_end1).add(6, 'days')),
        is_deleted: false
      }
    };

    let data = await Model.getNowShowing(lambda);
    data[0].theaters = data[0].theaters.filter((item) => item._id !== null);
    data[0].films = data[0].films.filter((item) => item._id !== null);
    return resSuccess(data[0]);
  } catch (error) {
    // throw {status: 400, detail: error};
    throw {status: 400, detail: error};
  }
};

const getList = async (params) => {
  try {
    let lambda = {
      conditions: {...params, is_deleted: false},
      views: {
        _id: 1,
        time_start: 1,
        time_end: 1,
        film_id: 1,
        theater_id: 1,
        room_id: 1,
        room: 1,
        theater: 1
      }
    };
    let time_now = new Date(moment());
    let data = await Model.findByLambda_detail(lambda, time_now);
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
        time_start: 1,
        time_end: 1,
        film_id: 1,
        theater_id: 1,
        room_id: 1,
        room: 1,
        theater: 1
      }
    };
    let time_now = new Date(moment());
    let data = await Model.findByLambda_detail(lambda, time_now);
    return resSuccess(data[0]);
  } catch (error) {
    throw {status: 400, detail: error};
  }
};

const postCreate = async (params) => {
  try {
    let lambda = {
      time_start: params.time_start || undefined,
      time_end: params.time_end || undefined,
      film_id: params.film_id || undefined,
      theater_id: params.theater_id || undefined,
      room_id: params.room_id || undefined,
      is_deleted: false,
      created_at: moment.now(),
      updated_at: moment.now()
    };

    let schedule_old = await Model.findByLambda({
      conditions: {
        theater_id: lambda.theater_id,
        room_id: lambda.room_id
      }
    });

    let time_start = moment(lambda.time_start);
    let time_end = moment(lambda.time_end);
    let long_time = time_end - time_start;
    schedule_old.forEach((element) => {
      if (Math.abs(moment(element.time_start) - time_start) <= long_time) {
        throw {status: 204, detail: {message: 'This time frame is existed'}};
      }
    });

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
        time_start: params.time_start || undefined,
        time_end: params.time_end || undefined,
        film_id: params.film_id || undefined,
        theater_id: params.theater_id || undefined,
        room_id: params.room_id || undefined,
        updated_at: moment.now()
      }
    };
    lambda.params = omitBy(lambda.params, isNil);
    console.log(lambda.params.time_start, lambda.params.time_end);

    if (lambda.params.time_start && lambda.params.time_end) {
      console.log(lambda.params.time_start, lambda.params.time_end);
      let schedule_old = await Model.findByLambda({
        conditions: {
          theater_id: lambda.params.theater_id,
          room_id: lambda.params.room_id
        }
      });

      let time_start = moment(lambda.params.time_start);
      let time_end = moment(lambda.params.time_end);
      let long_time = time_end - time_start;
      schedule_old.forEach((element) => {
        if (
          Math.abs(moment(element.time_start) - time_start) <= long_time &&
          element._id != id
        ) {
          throw {status: 204, detail: {message: 'This time frame is existed'}};
        }
      });
    }

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

// const putUpdateSchedule = async (film_id, long_time) => {
//   try {
//     console.log(film_id);
//     let film_schedules = await require('./model').findByLambda({
//       conditions: {film_id: film_id}
//     });
//     // console.log('film_schedules:', film_schedules);

//     await film_schedules.forEach(async (element) => {
//       console.log('time_start', element.time_start);

//       // let time_end = element.time_start.add(long_time, 'minutes');
//       let time_end = moment(element.time_start).add(100, 'minute');
//       console.log('time_end:', Date(time_end));
//       let rs = await Model.updateByLambda(
//         {conditions: {film_id: film_id}},
//         {params: {time_end: Date(time_end)}}
//       );
//       console.log('rs:', rs);
//     });

//     return {data: 'ok'};
//     // let data = await Model.updateByLambda(lambda);
//     // if (data.ok) {
//     //   let result = await findById(id);
//     //   return result;
//     // } else {
//     //   throw {status: 400, detail: data};
//     // }
//   } catch (error) {
//     throw {status: 400, detail: error};
//   }
// };

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
  getNowShowing,
  getList,
  findById,
  postCreate,
  putUpdate,
  deleteData
  // putUpdateSchedule
};
