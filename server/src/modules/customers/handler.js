const Model = require('./model');
const resSuccess = require('../../responses/res-success');
const {omitBy, isNil} = require('lodash');
const moment = require('moment');
const jwt = require('../../jwt');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const key = require('../../config/keys.json');
const {google} = require('googleapis');

const getList = async (params) => {
  try {
    let lambda = {
      conditions: {...params, is_deleted: false},
      views: {
        _id: 1,
        name: 1,
        phone: 1,
        date_of_birth: 1,
        account_type: 1,
        facebook_id: 1,
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
        account_type: 1,
        facebook_id: 1,
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

const postLoginFacebook = async (req, res, next) => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: key.facebook.facebook_key,
        clientSecret: key.facebook.facebook_secret,
        callbackURL: '/api/customer/auth/facebook/callback'
      },
      function (accessToken, refreshToken, profile, done) {
        process.nextTick(async function () {
          try {
            let customerExisted = await Model.findByLambda({
              conditions: {
                facebook_id: profile.id
              }
            });
            if (customerExisted && customerExisted.length) {
              return done(
                null,
                resSuccess({
                  token: jwt.encode(customerExisted[0]),
                  customer: customerExisted[0]
                })
              );
            } else {
              let lambda = {
                facebook_id: profile.id || undefined,
                name: profile.displayName || undefined,
                phone: profile.phone || undefined,
                date_of_birth: profile.date_of_birth || undefined,
                email: profile.email || undefined,
                gender: profile.gender || undefined,
                avatar: profile.avatar || undefined,
                adress: profile.adress || undefined,
                account_type: profile.provider || undefined,
                is_deleted: false,
                created_at: moment.now(),
                updated_at: moment.now()
              };

              let data = await Model.createByLambda(lambda);
              return done(
                null,
                resSuccess({
                  token: jwt.encode(data[0]),
                  customer: data[0]
                })
              );
            }
          } catch (error) {
            return done(error);
          }
        });
      }
    )
  );
  next();
};

const postLoginGoogle = async (req, res, next) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: key.google.client_id,
        clientSecret: key.google.client_secret,
        callbackURL: '/api/customer/auth/google/callback'
      },
      async function (accessToken, refreshToken, profile, done) {
        await process.nextTick(async function () {
          try {
            let customerExisted = await Model.findByLambda({
              conditions: {
                google_id: profile.id
              }
            });
            if (customerExisted && customerExisted.length) {
              return done(
                null,
                resSuccess({
                  token: jwt.encode(customerExisted[0]),
                  customer: customerExisted[0]
                })
              );
            } else {
              let lambda = {
                google_id: profile.id || undefined,
                name:
                  profile.name.familyName + ' ' + profile.name.givenName ||
                  undefined,
                phone: profile.phone || undefined,
                date_of_birth: profile.date_of_birth || undefined,
                email: profile.emails[0].value || undefined,
                gender: profile.gender || undefined,
                avatar: profile.photos[0].value || undefined,
                adress: profile.address || undefined,
                account_type: profile.provider || undefined,
                is_deleted: false,
                created_at: moment.now(),
                updated_at: moment.now()
              };

              console.log('lambda', lambda);

              let data = await Model.createByLambda(lambda);
              return done(
                null,
                resSuccess({
                  token: jwt.encode(data[0]),
                  customer: data[0]
                })
              );
            }
          } catch (error) {
            return done(error);
          }
        });
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
  putUpdate,
  deleteData,
  postLoginFacebook,
  postLoginGoogle
};
