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
        comment: 1
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
        name: 1,
        address: 1,
        url_image: 1,
        comment: 1
      }
    };
    let data = await Model.getDetail(lambda);
    return resSuccess(data[0]);
  } catch (error) {
    throw {status: 400, detail: error};
  }
};

const getFilmToDay = async () => {
  try {
    // let time_start = new Date(moment().add(7, 'hour'));
    let time_start = new Date(moment());

    let hour = new Date(moment()).getHours();
    let date = new Date(moment().add(1, 'days')).getDate();
    // if (hour > 17) {
    //   date -= 1;
    // }
    let month = new Date(moment().add(1, 'days')).getMonth();
    let year = new Date(moment().add(1, 'days')).getFullYear();

    let time_end = new Date(
      moment(
        `${year}-${month > 8 ? month + 1 : '0' + (month + 1)}-${
          date > 9 ? date : '0' + date
        }`,
        moment.ISO_8601
      )
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
const getTheater7Day = async (id) => {
  try {
    let time_start = new Date(moment().subtract(0, 'hour'));

    let hour = new Date(moment()).getHours();
    let minute = new Date(moment()).getMinutes();
    console.log('hour', hour);
    let time_end = new Date(
      moment()
        .subtract(hour + 7, 'hour')
        .subtract(minute + 1, 'minutes')
        .add(1, 'days')
    );

    console.log('time_start: ', time_start);
    console.log('time_end:   ', time_end);

    let lambda = {
      conditions: {
        _id: id,
        time_start: time_start,
        time_end: time_end,
        time_end2: new Date(moment(time_end).add(1, 'days')),
        time_end3: new Date(moment(time_end).add(2, 'days')),
        time_end4: new Date(moment(time_end).add(3, 'days')),
        time_end5: new Date(moment(time_end).add(4, 'days')),
        time_end6: new Date(moment(time_end).add(5, 'days')),
        time_end7: new Date(moment(time_end).add(6, 'days')),
        is_deleted: false
      }
    };

    console.log('lambda', lambda);
    let data = await Model.getTheater7Day(lambda);

    let detail = {...data[0]};
    let info = {...detail.theater};

    let schedules = [];
    schedules.push(
      detail.day1.films.filter((item) => item.film_schedules.length > 0)
    );
    schedules.push(
      detail.day2.films.filter((item) => item.film_schedules.length > 0)
    );
    schedules.push(
      detail.day3.films.filter((item) => item.film_schedules.length > 0)
    );
    schedules.push(
      detail.day4.films.filter((item) => item.film_schedules.length > 0)
    );
    schedules.push(
      detail.day5.films.filter((item) => item.film_schedules.length > 0)
    );
    schedules.push(
      detail.day6.films.filter((item) => item.film_schedules.length > 0)
    );
    schedules.push(
      detail.day7.films.filter((item) => item.film_schedules.length > 0)
    );
    return resSuccess({
      detail: info,
      dayOfWeeks: schedules
    });
    //return resSuccess({detail: data[0], dayOfWeek: dayOfWeek});
  } catch (error) {
    // throw {status: 400, detail: error};
    throw {status: 400, detail: error};
  }
};

module.exports = {
  getList,
  findById,
  getFilmToDay,
  postCreate,
  putUpdate,
  deleteData,
  getTheater7Day
};
