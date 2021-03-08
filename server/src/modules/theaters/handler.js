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
    let minute = new Date(moment()).getMinutes();

    let time_end = new Date(
      moment()
        .subtract(hour + 7, 'hour')
        // .subtract(7, 'hour')
        .subtract(minute, 'minutes')
        .add(1, 'days')
    );

    console.log('time_start: ', new Date(moment()));
    console.log('time_end:   ', time_end);

    let lambda = {
      conditions: {
        time_start: time_start,
        time_end: time_end,
        is_deleted: false
      }
    };
    console.log('lambda:', lambda);
    let data = await Model.getFilmToDay(lambda);

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
    if (data.ok) {
      let result = await Model.findByLambda({conditions: {_id: id}});
      return resSuccess(result[0]);
    } else {
      throw {status: 400, detail: data};
    }
  } catch (error) {
    throw {status: 400, detail: error};
  }
};
const getTheater7Day = async (id) => {
  try {
    let hour1 = new Date(moment()).getHours();
    let minute1 = new Date(moment()).getMinutes();

    let start = moment.now();
    console.log('start:', new Date(start));
    console.log('start:', start);
    let start1 = moment(start).add(1, 'days');
    console.log('start1:', start1);
    let start2 = moment(start1)
      .subtract(hour1 + 7, 'hour')
      .subtract(minute1, 'minutes');
    console.log('start2:', start2);

    let time_start = new Date(moment());

    let hour = new Date(moment()).getHours();
    let minute = new Date(moment()).getMinutes();

    let now = moment.now();

    let time_end = moment(now)
      .add(1, 'days')
      .subtract(hour + 7, 'hour')
      .subtract(minute, 'minutes');

    console.log('hour:', hour);
    console.log('time_start: ', time_start);
    console.log('time_end:   ', time_end);

    let time_end1 = new Date(moment(time_end).add(0, 'days'));

    let lambda = {
      conditions: {
        _id: id,
        time_start: time_start,
        time_end: time_end1,
        time_end2: new Date(moment(time_end1).add(1, 'days')),
        time_end3: new Date(moment(time_end1).add(2, 'days')),
        time_end4: new Date(moment(time_end1).add(3, 'days')),
        time_end5: new Date(moment(time_end1).add(4, 'days')),
        time_end6: new Date(moment(time_end1).add(5, 'days')),
        time_end7: new Date(moment(time_end1).add(6, 'days')),
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
