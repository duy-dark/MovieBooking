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
        content: 1,
        countries: 1,
        long_time: 1,
        start_date: 1,
        directors: 1,
        actors: 1,
        rates: 1,
        rate_count: 1,
        imdb: 1,
        digitals: 1,
        url_avatar: 1,
        url_background: 1,
        is_blockbuster: 1,
        category_ids: 1
      }
    };
    let data = await Model.findByLambda(lambda);
    return resSuccess(data);
  } catch (error) {
    throw {status: 400, detail: error};
  }
};

const getDetail = async (params) => {
  try {
    let lambda = {
      conditions: {...params, is_deleted: false},
      views: {
        _id: 1,
        name: 1,
        trailer: 1,
        content: 1,
        countries: 1,
        long_time: 1,
        start_date: 1,
        directors: 1,
        actors: 1,
        rates: 1,
        rate_count: 1,
        imdb: 1,
        digitals: 1,
        url_avatar: 1,
        url_background: 1,
        is_blockbuster: 1,
        categories: 1,
        film_schedules: 1
      }
    };
    let days = [
      'chủ nhật',
      'thứ 2',
      'thứ 3',
      'thứ 4',
      'thứ 5',
      'thứ 6',
      'thứ 7'
    ];

    let arr = [];
    let now = moment();
    for (let i = 0; i < 7; i++) {
      arr.push({
        name: days[moment(now).add(i, 'days').day()],
        date: moment(now).add(i, 'days').format('DD/MM/YYYY'),
        day: moment(now).add(i, 'days').format('DD'),
        dateISO_8601: moment(now, moment.ISO_8601).add(i, 'days')
      });
    }

    let data = await Model.getDetail(lambda);
    // data.forEach((element) => {
    //   element = {...element, listday: arr};
    // });

    data = data.map((item) => ({...item, listday: arr}));
    // let data = await Model.getDetail(lambda);
    return resSuccess(data);
  } catch (error) {
    throw {status: 400, detail: error};
  }
};

const getcomment = async (lambda) => {
  try {
    let data = await Model.getcomment();
    //let result = data.filter((item) => !!item.film_id);
    let result = data.filter((item) => item.film_id == lambda);
    return resSuccess(result);
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
        trailer: 1,
        content: 1,
        countries: 1,
        long_time: 1,
        start_date: 1,
        directors: 1,
        actors: 1,
        rates: 1,
        rate_count: 1,
        imdb: 1,
        digitals: 1,
        url_avatar: 1,
        url_background: 1,
        is_blockbuster: 1,
        categories: 1,
        film_schedules: 1
      }
    };
    let data = await Model.getDetail(lambda);
    // let now = moment.now();

    // let arrayDay = [];
    // arrayDay.push(now);
    // for (let i = 1; i < 7; i++) {
    //   let day = moment(now, 'DD-MM-YYYY').add(i, 'days');
    //   arrayDay.push(day);
    // }

    let days = [
      'chủ nhật',
      'thứ 2',
      'thứ 3',
      'thứ 4',
      'thứ 5',
      'thứ 6',
      'thứ 7'
    ];
    let arr = [];
    let now = moment();
    for (let i = 0; i < 7; i++) {
      arr.push({
        name: days[moment(now).add(i, 'days').day()],
        date: moment(now).add(i, 'days').format('DD/MM/YYYY'),
        day: moment(now).add(i, 'days').format('DD'),
        dateISO_8601: moment(now, moment.ISO_8601).add(i, 'days')
      });
    }

    console.log('arr:', arr);
    // let data = await Model.getDetail(lambda);
    data[0] = {...data[0], listday: arr};

    return resSuccess(data[0]);
  } catch (error) {
    throw {status: 400, detail: error};
  }
};

const postCreate = async (params) => {
  try {
    let lambda = {
      name: params.name || undefined,
      content: params.content || undefined,
      countries: params.countries || undefined,
      long_time: params.long_time || undefined,
      start_date: params.start_date || undefined,
      directors: params.directors || undefined,
      actors: params.actors || undefined,
      rates: params.rates || undefined,
      rate_count: params.rate_count || undefined,
      imdb: params.imdb || undefined,
      digitals: params.digitals || undefined,
      url_avatar: params.url_avatar || undefined,
      url_background: params.url_background || undefined,
      is_blockbuster: params.is_blockbuster || false,
      category_ids: params.category_ids || undefined,
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
        content: params.content || undefined,
        countries: params.countries || undefined,
        long_time: params.long_time || undefined,
        start_date: params.start_date || undefined,
        directors: params.directors || undefined,
        actors: params.actors || undefined,
        rates: params.rates || undefined,
        rate_count: params.rate_count || undefined,
        imdb: params.imdb || undefined,
        digitals: params.digitals || undefined,
        url_avatar: params.url_avatar || undefined,
        url_background: params.url_background || undefined,
        is_blockbuster: params.is_blockbuster || false,
        category_ids: params.category_ids || undefined,
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

let getFilmInPeriod = async (params) => {
  try {
    console.log('helloworld: ', params);
    let data = await Model.getNowShowing(params);
    return resSuccess(data);
  } catch (error) {
    return error;
  }
};
module.exports = {
  getList,
  getDetail,
  getcomment,
  findById,
  postCreate,
  putUpdate,
  deleteData,
  getFilmInPeriod
};
