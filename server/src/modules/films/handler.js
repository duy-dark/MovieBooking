let Model = require('./model');
const resSuccess = require('../../responses/res-success');
const {omitBy, isNil} = require('lodash');
const moment = require('moment');
let path = require('path');

let cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: 'dkpv3a73a',
  api_key: '319327752335849',
  api_secret: 'bZSWKqMyIW8E8uH9gSbyJnJ_j9w'
});

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

    // let days = [
    //   'chủ nhật',
    //   'thứ 2',
    //   'thứ 3',
    //   'thứ 4',
    //   'thứ 5',
    //   'thứ 6',
    //   'thứ 7'
    // ];
    // let arr = [];
    // let now = moment();
    // for (let i = 0; i < 7; i++) {
    //   arr.push({
    //     name: days[moment(now).add(i, 'days').day()],
    //     date: moment(now).add(i, 'days').format('DD/MM/YYYY'),
    //     day: moment(now).add(i, 'days').format('DD'),
    //     dateISO_8601: moment(now, moment.ISO_8601).add(i, 'days')
    //   });
    // }

    // console.log('arr:', arr);
    // // let data = await Model.getDetail(lambda);
    // // data[0] = {...data[0], listday: arr};
    // data[0] = {...data};

    return resSuccess(data[0]);
  } catch (error) {
    throw {status: 400, detail: error};
  }
};

const getFilm7Day = async (id) => {
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

    let lambda = {
      conditions: {
        _id: id,
        time_start: time_start,
        time_end: time_end,

        // time_end1: new Date(moment(time_end).add(0, 'days')),
        time_end2: new Date(moment(time_end).add(1, 'days')),
        time_end3: new Date(moment(time_end).add(2, 'days')),
        time_end4: new Date(moment(time_end).add(3, 'days')),
        time_end5: new Date(moment(time_end).add(4, 'days')),
        time_end6: new Date(moment(time_end).add(5, 'days')),
        time_end7: new Date(moment(time_end).add(6, 'days')),
        is_deleted: false
      }
    };

    let data = await Model.getFilm7Day(lambda);

    let detail = {...data[0]};
    let info = {...detail.film};
    let schedules = [];
    schedules.push(
      detail.day1.theaters.filter((item) => item.film_schedules.length > 0)
    );
    schedules.push(
      detail.day2.theaters.filter((item) => item.film_schedules.length > 0)
    );
    schedules.push(
      detail.day3.theaters.filter((item) => item.film_schedules.length > 0)
    );
    schedules.push(
      detail.day4.theaters.filter((item) => item.film_schedules.length > 0)
    );
    schedules.push(
      detail.day5.theaters.filter((item) => item.film_schedules.length > 0)
    );
    schedules.push(
      detail.day6.theaters.filter((item) => item.film_schedules.length > 0)
    );
    schedules.push(
      detail.day7.theaters.filter((item) => item.film_schedules.length > 0)
    );
    return resSuccess({
      detail: info,
      dayOfWeeks: schedules
    });
  } catch (error) {
    throw {status: 400, detail: error};
  }
};

const postCreate = async (params, avatar, background) => {
  try {
    console.log(avatar, background);
    let avatarFile = path.join(
      `${process.cwd()}/uploads/${avatar[0].filename}`
    );
    let backgroundFile = path.join(
      `${process.cwd()}/uploads/${background[0].filename}`
    );

    let uploadAvatar = await cloudinary.uploader.upload(
      avatarFile,
      {
        resource_type: 'image',
        public_id: `film/${avatar[0].filename}`,
        overwrite: true,
        notification_url:
          'https://cloudinary.com/console/c-4205030a9f5c35e013957834134f1a/media_library/folders/5d68242865dc959266460583adbed53d'
      },
      function (error, result) {
        return {error: error, result: result};
      }
    );

    let uploadBackground = await cloudinary.uploader.upload(
      backgroundFile,
      {
        resource_type: 'image',
        public_id: `film/${background[0].filename}`,
        overwrite: true,
        notification_url:
          'https://cloudinary.com/console/c-4205030a9f5c35e013957834134f1a/media_library/folders/5d68242865dc959266460583adbed53d'
      },
      function (error, result) {
        return {error: error, result: result};
      }
    );

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

    return resSuccess({avatar: uploadAvatar, background: uploadBackground});
    // return image;
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

    return resSuccess(data);
  } catch (error) {
    // throw {status: 400, detail: error};
    throw {status: 400, detail: error};
  }
};

const getCommingSoon = async () => {
  try {
    let time_start = new Date(moment());

    let date = new Date(moment().add(7, 'days')).getDate();

    let month = new Date(moment().add(7, 'days')).getMonth();
    let year = new Date(moment().add(7, 'days')).getFullYear();

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
        time_start: time_end1,
        time_end1: new Date(moment(time_end1).add(1, 'days')),
        time_end2: new Date(moment(time_end1).add(2, 'days')),
        time_end3: new Date(moment(time_end1).add(3, 'days')),
        time_end4: new Date(moment(time_end1).add(4, 'days')),
        time_end5: new Date(moment(time_end1).add(5, 'days')),
        time_end6: new Date(moment(time_end1).add(6, 'days')),
        time_end7: new Date(moment(time_end1).add(7, 'days')),
        is_deleted: false
      }
    };

    let data = await Model.getNowShowing(lambda);

    return resSuccess(data);
  } catch (error) {
    // throw {status: 400, detail: error};
    throw {status: 400, detail: error};
  }
};

// let getCommingSoon = async (params) => {
//   try {
//     console.log('helloworld: ', params);
//     let data = await Model.getCommingSoon(params);
//     return resSuccess(data);
//   } catch (error) {
//     return error;
//   }
// };

module.exports = {
  getList,
  getDetail,
  getcomment,
  findById,
  getFilm7Day,
  postCreate,
  putUpdate,
  deleteData,
  getNowShowing,
  getCommingSoon
};
