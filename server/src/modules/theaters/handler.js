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
        name: 1,
        address: 1,
        url_image: 1,
        comment: 1,
        room_ids: 1
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
        name: 1,
        address: 1,
        url_image: 1,
        comment: 1,
        room_ids: 1
      }
    };
    let data = await Model.findByLambda(lambda);
    return resSuccess(data[0]);
  } catch (error) {
    throw {status: 400, detail: error};
  }
};

const getFilmToDay = async () => {
  try {
    // let time_start = new Date(moment().add(7, 'hour'));
    let time_start = new Date(moment().add(7, 'hour'));

    let hour = new Date(moment()).getHours();
    let date = new Date(moment().add(7, 'hour').add(1, 'days')).getDate();
    if (hour > 17) {
      date -= 1;
    }
    let month = new Date(moment().add(7, 'hour').add(1, 'days')).getMonth();
    let year = new Date(moment().add(7, 'hour').add(1, 'days')).getFullYear();

    let time_end = new Date(
      moment(
        `${year}-${month > 8 ? month + 1 : '0' + (month + 1)}-${
          date > 9 ? date : '0' + date
        }`,
        moment.ISO_8601
      ).add(7, 'hour')
    );

    console.log('time_start: ', new Date(moment()));
    console.log('time_end:   ', time_end);
    console.log('date:       ', date);
    console.log('month:      ', month + 1);
    console.log('year:       ', year);

    let lambda = {
      conditions: {
        time_start: time_start,
        time_end: time_end,
        is_deleted: false
      }
    };

    let data = await Model.getFilmToDay(lambda);

    // data = data.map((theater) => {
    //   return {
    //     ...theater,
    //     films:
    //       theater.films &&
    //       theater.films.map((film) => {
    //         return {
    //           ...film,
    //           film_schedules:
    //             film.film_schedules.length > 0 &&
    //             film.film_schedules.filter((schedule) => {
    //               let timeStart = moment(schedule.time_start);
    //               return (
    //                 timeStart.diff(moment(time_start)) >= 0 &&
    //                 timeStart.diff(moment(time_end)) <= 0
    //               );
    //             })
    //         };
    //       })
    //   };
    // });
    return resSuccess(data);
  } catch (error) {
    // throw {status: 400, detail: error};
    throw {status: 400, detail: error};
  }
};

const postCreate = async (params) => {
  try {
    let lambda = {
      name: params.name || undefined,
      address: params.address || undefined,
      url_image: params.url_image || undefined,
      comment: params.comment || undefined,
      room_ids: params.room_ids || undefined,
      is_deleted: false,
      created_at: moment.now(),
      updated_at: moment.now()
    };
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
        name: params.name || undefined,
        address: params.address || undefined,
        url_image: params.url_image || undefined,
        comment: params.comment || undefined,
        room_ids: params.room_ids || undefined,
        updated_at: moment.now()
      }
    };
    lambda.params = omitBy(lambda.params, isNil);
    let data = await Model.updateByLambda(lambda);
    return resSuccess(data);
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
  getFilmToDay,
  postCreate,
  putUpdate,
  deleteData
};
