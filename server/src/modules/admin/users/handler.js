const User = require('../../models/user.model');
const resSuccess = require('./../../response/res-success');
const {omitBy, isNil} = require('lodash');
const moment = require('moment');
const {validationResult} = require('express-validator');

module.exports = {
  listUser: async function (req, res) {
    let users = await User.findByLambda();
    res.json(resSuccess({data: user}));
  },

  findById: async function (req, res) {
    let id = req.params.id;
    let users = await User.findByLambda({_id: id});
    res.json(resSuccess({data: users[0]}));
  },

  postCreate: async function (req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        throw {
          status: 402,
          errCode: 1,
          detail: errors.array()
        };
      }
      let entity = {
        name: req.body.name || '',
        phone: req.body.phone || '',
        date_of_birth: req.body.date_of_birth || '',
        email: req.body.email || '',
        password: req.body.password || '',
        permission: req.body.permission || '',
        avatar: req.body.avatar || '',
        adress: req.body.adress || '',
        updated_at: moment().now(),
        isDeleted: false
      };
      let user = await User.createByLambda(entity);
      res.json(resSuccess({data: user}));
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
        name: req.body.name || '',
        phone: req.body.phone || '',
        date_of_birth: req.body.date_of_birth || '',
        email: req.body.email || '',
        password: req.body.password || '',
        permission: req.body.permission || '',
        avatar: req.body.avatar || '',
        adress: req.body.adress || '',
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
