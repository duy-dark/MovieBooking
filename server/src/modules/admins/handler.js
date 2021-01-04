const Model = require('./model');
const resSuccess = require('../../responses/res-success');
const jwt = require('../../jwt');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const {omitBy, isNil} = require('lodash');
const moment = require('moment');

const getList = async (params) => {
  try {
    let data = await Model.findByLambda(params);
    if (data.length === 0)
      throw {
        status: 204,
        detail: "Doesn't exist any admin"
      };
    let result = [];
    data.forEach((item) => {
      let temp = {
        name: item.name,
        phone: item.phone,
        date_of_birth: item.date_of_birth,
        email: item.email,
        permission: item.permission,
        avatar: item.avatar,
        adress: item.adress
      };
      result.push(temp);
      console.log('result ', result);
    });

    return resSuccess(result);
  } catch (error) {
    throw {
      status: 400,
      detail: error
    };
  }
};

const findById = async (id) => {
  try {
    let data = await Model.findByLambda({_id: id});
    if (data.length === 0)
      throw {
        status: 204,
        detail: 'Admin not found'
      };
    let result = {
      name: data[0].name,
      phone: data[0].phone,
      date_of_birth: data[0].date_of_birth,
      email: data[0].email,
      permission: data[0].permission,
      avatar: data[0].avatar,
      adress: data[0].adress
    };
    return resSuccess(result);
  } catch (error) {
    return error;
  }
};

const postCreate = async (params) => {
  try {
    let adminExisted = await Model.findByLambda({email: params.email});
    if (adminExisted && adminExisted.length) {
      throw {
        status: 204,
        detail: 'This email is registered! Please pick other email!'
      };
    }
    params.password = await bcrypt.hash(params.password, saltRounds);
    let entity = {
      name: params.name || undefined,
      phone: params.phone || undefined,
      date_of_birth: params.date_of_birth || undefined,
      email: params.email || undefined,
      password: params.password || undefined,
      permission: params.permission || undefined,
      avatar: params.avatar || undefined,
      adress: params.adress || undefined,
      is_deleted: false,
      created_at: moment.now(),
      updated_at: moment.now()
    };
    console.log(entity);
    let data = await Model.createByLambda(entity);
    return resSuccess(data);
  } catch (error) {
    throw {status: 400, detail: error};
  }
};

const putUpdate = async (id, params) => {
  try {
    params.password = await bcrypt.hash(params.password, saltRounds);
    let entity = {
      name: params.name || undefined,
      phone: params.phone || undefined,
      date_of_birth: params.date_of_birth || undefined,
      email: params.email || undefined,
      password: params.password || undefined,
      permission: params.permission || undefined,
      avatar: params.avatar || undefined,
      adress: params.adress || undefined,
      updated_at: moment.now()
    };
    entity = omitBy(entity, isNil);
    let data = await Model.updateByLambda({_id: id}, entity);
    return resSuccess(data);
  } catch (error) {
    throw {
      status: 400,
      message: error
    };
  }
};

const deleteData = async (id) => {
  try {
    let entity = {
      is_deleted: true
    };
    let data = await Model.updateByLambda({_id: id}, entity);
    return resSuccess(data);
  } catch (error) {
    throw {
      status: 400,
      message: error
    };
  }
};

const patchUpdateBySelf = async (id, admin, adminOld) => {
  try {
    let adminUpdate = Object.assign({}, adminOld, admin);
    let update = await Model.updateByLambda(id, adminUpdate);
    if (update.affectedRows < 1) {
      throw {
        status: 204,
        message: 'Admin update fails!'
      };
    }
    let data = await Model.getById(id);
    delete data[0].password;
    return resSuccess({admin: data[0]});
  } catch (error) {
    throw {
      status: 400,
      message: error
    };
  }
};

const postLogin = async (params) => {
  try {
    let data = await Model.findByLambda({email: params.email});
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
    if (data[0].isDeleted) {
      throw {
        status: 204,
        detail: 'Admin is deleted!'
      };
    }
    delete data[0].password;
    return resSuccess({token: jwt.encode(data[0]), admin: data[0]});
  } catch (error) {
    throw {
      status: 400,
      detail: error
    };
  }
};

module.exports = {
  getList,
  findById,
  postCreate,
  putUpdate,
  deleteData,
  patchUpdateBySelf,
  postLogin
};
