const Model = require('./model');
const resSuccess = require('../../responses/res-success');
const {omitBy, isNil} = require('lodash');
const moment = require('moment');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const key = require('../../config/keys.json');

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
        gender: 1,
        avatar: 1,
        address: 1
      }
    };
    let data = await Model.findByLambda(lambda);
    if (data.length === 0)
      throw {
        status: 204,
        detail: "Doesn't exist any customer"
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
        _id: 1,
        name: 1,
        phone: 1,
        date_of_birth: 1,
        email: 1,
        gender: 1,
        avatar: 1,
        address: 1
      }
    };
    let data = await Model.findByLambda(lambda);
    if (data.length === 0)
      throw {
        status: 204,
        detail: 'Customer not found'
      };
    return resSuccess(data);
  } catch (error) {
    throw {status: 400, detail: error};
  }
};

const postCreate = async (params) => {
  try {
    let lambda = {
      name: params.name || undefined,
      phone: params.phone || undefined,
      date_of_birth: params.date_of_birth || undefined,
      email: params.email || undefined,
      gender: params.gender || undefined,
      avatar: params.avatar || undefined,
      adress: params.adress || undefined,
      token_gg: params.token_gg || undefined,
      token_zalo: params.token_zalo || undefined,
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
    let lambda = {
      conditions: {_id: id, is_deleted: false},
      params: {
        name: params.name || undefined,
        phone: params.phone || undefined,
        date_of_birth: params.date_of_birth || undefined,
        email: params.email || undefined,
        gender: params.gender || undefined,
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
const postLoginGoogle = async (req, res, next) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: key.web.client_id,
        clientSecret: key.web.client_secret,
        callbackURL: '/api/customer/auth/google/callback'
      },

      (accessToken, refreshToken, profile, done) => {
        console.log('access_token', accessToken);
        // console.log('refeshToken', refreshToken);
        // console.log('profile', profile);
        // console.log('email_address', profile._json.email);
        // console.log('user name', profile.displayName);
        // console.log('avatar', profile._json.picture);
        // console.log('done', done);
        return done(null, profile);
      }
    )
  );

  next();
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
  postCreate,
  putUpdate,
  deleteData,
  postLoginGoogle
};
