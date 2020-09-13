const User = require('../../models/user.model');
const resSuccess = require('./../../response/res-success');
const {omitBy, isNil} = require('lodash');

module.exports = {
  listUser: async function (req, res) {
    var users = await User.findByLambda();
    res.json(users);
  },

  findById: async function (req, res) {
    var id = req.params.id;
    var users = await User.findByLambda({_id: id});
    res.json(users[0]);
  },

  postCreate: async function (req, res, next) {
    var entity = {
      name: req.body.name || '',
      phone: req.body.phone || '',
      date_of_birth: req.body.date_of_birth || '',
      email: req.body.email || '',
      password: req.body.password || '',
      permission: req.body.permission || '',
      avatar: req.body.avatar || '',
      adress: req.body.adress || '',
      create_at: req.body.create_at || '',
      isDeleted: false
    };
    await User.createByLambda(entity)
      .then(() => {
        res.json(resSuccess({data: 'Create user successfully'}));
      })
      .catch((err) => {
        next(err);
      });
  },

  patchUpdate: async function (req, res, next) {
    var id = req.params.id;
    var entity = {
      name: req.body.name || '',
      phone: req.body.phone || '',
      date_of_birth: req.body.date_of_birth || '',
      email: req.body.email || '',
      password: req.body.password || '',
      permission: req.body.permission || '',
      avatar: req.body.avatar || '',
      adress: req.body.adress || '',
      updated_at: req.body.updated_at || ''
    };
    var result = omitBy(entity, isNil);

    await User.updateByLambda({_id: id}, result)
      .then(() => {
        res.json(resSuccess({data: 'Update user successfully'}));
      })
      .catch((err) => {
        next(err);
      });
  },

  delete: async function (req, res) {
    var id = req.params.id;
    var entity = {
      isDeleted: true
    };
    await User.updateByLambda({_id: id}, entity)
      .then(() => {
        res.send('Delete user successfully');
      })
      .catch((err) => {
        res.send('Delete user failed');
      });
  }
};
