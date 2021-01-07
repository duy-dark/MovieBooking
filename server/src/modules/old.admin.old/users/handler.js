const User = require('../../models/user.model');
const Token = require('../../models/token.model');
const {createToken, intDate} = require('../../../util');
const resSuccess = require('../../../responses/res-success');
const {omitBy, isNil} = require('lodash');
const moment = require('moment');
const {validationResult} = require('express-validator');
const sha256 = require('crypto-js/sha256');

module.exports = {
  listUser: async function (req, res) {
    let users = await User.findByLambda();
    res.json(resSuccess({data: users}));
  },

  findById: async function (req, res) {
    let id = req.params.id;
    let users = await User.findByLambda({_id: id});
    res.json(resSuccess({data: users[0]}));
  },

  postCreate: async function (req, res, next) {
    try {
      console.log('Chaaaaaaaaaaaaaaaaaayyyyyyyyyyyyyyyyyyy');
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        throw {
          status: 402,
          errCode: 1,
          detail: errors.array()
        };
      }
      let password = sha256(req.body.password).toString();
      let entity = {
        name: req.body.name || undefined,
        phone: req.body.phone || undefined,
        date_of_birth: req.body.date_of_birth || undefined,
        email: req.body.email || undefined,
        password: password || undefined,
        permission: req.body.permission || undefined,
        avatar: req.body.avatar || undefined,
        adress: req.body.adress || undefined,
        updated_at: moment.now(),
        isDeleted: false
      };

      let users = await User.createByLambda(entity);
      // create token return token and expires_in
      let valueToken = await createToken(users[0]);
      let token_schema = {
        user_id: users[0]._id,
        token: valueToken.token,
        expires_in: +valueToken.expires_in,
        updated_at: moment.now()
      };
      let tokens = await Token.createByLamda(token_schema);
      user[0]['password'] = '******';
      res.json(
        resSuccess({
          user: users[0],
          token: tokens[0].token
        })
      );
    } catch (error) {
      next(error);
    }
  },

  patchUpdate: async function (req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        throw {
          status: 402,
          errCode: 1,
          detail: errors.array()
        };
      }

      let id = req.params.id;
      let entity = {
        name: req.body.name || undefined,
        phone: req.body.phone || undefined,
        date_of_birth: req.body.date_of_birth || undefined,
        email: req.body.email || undefined,
        password: req.body.password || undefined,
        permission: req.body.permission || undefined,
        avatar: req.body.avatar || undefined,
        adress: req.body.adress || undefined,
        updated_at: moment().now()
      };
      let result = omitBy(entity, isNil);

      let user = await User.updateByLambda({_id: id}, result);
      res.json(resSuccess({data: user}));
    } catch (error) {
      next(error);
    }
  },

  delete: async function (req, res) {
    try {
      let id = req.params.id;
      let entity = {
        isDeleted: true
      };
      let user = await User.updateByLambda({_id: id}, entity);
      res.json(resSuccess({user: user}));
    } catch (error) {
      next(error);
    }
  }
};
