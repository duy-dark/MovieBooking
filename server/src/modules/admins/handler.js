const Model = require('./model');
const resSuccess = require('../../responses/res-success');
const jwt = require('../../jwt');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const {omitBy, isNil} = require('lodash');
const moment = require('moment');

const getList = async (params) => {
  try {
    let lambda = {
      conditions: {...params, is_deleted: false},
      views: {
        _id: 1,
        name: 1,
        phone: 1,
        date_of_birth: 1,
        email: 1,
        permission_id: 1,
        avatar: 1,
        adress: 1
      }
    };
    let data = await Model.findByLambda(lambda);
    if (data.length === 0)
      throw {
        status: 204,
        detail: "Doesn't exist any admin"
      };
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
        name: '$name',
        phone: '$phone',
        date_of_birth: '$date_of_birth',
        email: '$email',
        adress: '$adress',
        avatar: '$avatar',
        permissions: '$permissions'
      }
    };
    let data = await Model.getDetail(lambda);
    if (data.length === 0)
      throw {
        status: 204,
        detail: "Doesn't exist any admin"
      };
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
        _id: 0,
        name: 1,
        phone: 1,
        date_of_birth: 1,
        email: 1,
        permission_id: 1,
        avatar: 1,
        adress: 1
      }
    };
    let data = await Model.findByLambda(lambda);
    if (data.length === 0)
      throw {
        status: 204,
        detail: 'Admin not found'
      };
    return resSuccess(data);
  } catch (error) {
    throw {status: 400, detail: error};
  }
};

const postCreate = async (params) => {
  try {
    let adminExisted = await Model.findByLambda({
      conditions: {email: params.email}
    });
    if (adminExisted && adminExisted.length) {
      console.log('adminExisted: ', adminExisted);
      throw {
        status: 204,
        detail: 'This email is registered! Please pick other email!'
      };
    }
    params.password = await bcrypt.hash(params.password, saltRounds);
    let lambda = {
      name: params.name || undefined,
      phone: params.phone || undefined,
      date_of_birth: params.date_of_birth || undefined,
      email: params.email || undefined,
      password: params.password || undefined,
      permission_id: params.permission_id || undefined,
      avatar: params.avatar || undefined,
      adress: params.adress || undefined,
      is_deleted: false,
      created_at: moment.now(),
      updated_at: moment.now()
    };
    console.log(lambda);
    let data = await Model.createByLambda(lambda);
    return resSuccess(data);
  } catch (error) {
    throw {status: 400, detail: error};
  }
};

const putUpdate = async (id, params) => {
  try {
    if (params.password) {
      params.password = await bcrypt.hash(params.password, saltRounds);
    }
    let lambda = {
      conditions: {_id: id, is_deleted: false},
      params: {
        name: params.name || undefined,
        phone: params.phone || undefined,
        date_of_birth: params.date_of_birth || undefined,
        email: params.email || undefined,
        password: params.password || undefined,
        permission_id: params.permission_id || undefined,
        avatar: params.avatar || undefined,
        adress: params.adress || undefined,
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

// const patchUpdateBySelf = async (id, admin, adminOld) => {
//   try {
//     let adminUpdate = Object.assign({}, adminOld, admin);
//     let update = await Model.updateByLambda(id, adminUpdate);
//     if (update.affectedRows < 1) {
//       throw {
//         status: 204,
//         message: 'Admin update fails!'
//       };
//     }
//     let data = await Model.getById(id);
//     delete data[0].password;
//     return resSuccess({admin: data[0]});
//   } catch (error) {
//     throw {
//       status: 400,
//       message: error
//     };
//   }
// };

const postLogin = async (params) => {
  try {
    let data = await Model.findByLambda({conditions: {email: params.email}});
    if (!data || !data.length) {
      throw {
        status: 204,
        detail: 'Admin is not existed!'
      };
    }
    let checkPassword = new Promise((resolve, reject) => {
      bcrypt.compare(params.password, data[0].password, function (err, result) {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
    await checkPassword.then((result) => {
      if (!result) {
        throw {
          status: 204,
          detail: 'Wrong password!'
        };
      }
    });
    if (data[0].is_deleted) {
      throw {
        status: 204,
        detail: 'Admin is deleted!'
      };
    }
    delete data[0].password;
    return resSuccess({token: jwt.encode(data[0]), admin: data[0]});
  } catch (error) {
    throw {status: 400, detail: error};
  }
};

module.exports = {
  getList,
  getDetail,
  findById,
  postCreate,
  putUpdate,
  deleteData,
  // patchUpdateBySelf,
  postLogin
};
