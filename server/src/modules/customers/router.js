const express = require('express');
const router = express.Router();
const handler = require('./handler');
const {omitBy, isNil} = require('lodash');
const passport = require('passport');

const verifyUser = require('../../middlewares/auth.user.middleware');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

router.get(
  '/auth/facebook',
  handler.postLoginFacebook,
  passport.authenticate('facebook', {scope: 'email'})
);

router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/api/customer/list/',
    failureRedirect: '/'
  })
);

router.get('/auth/logout', function (req, res) {
  console.log('logout');
  req.session = null;
  req.logout();
  res.redirect('https://www.google.com/');
});

router.get('/list', verifyUser.requireByUser, (req, res, next) => {
  // console.log('req.session.passport:', req.session.passport);
  // console.log(
  //   'passport.Authenticator.prototype.deserializeUser.arguments[0]:',
  //   passport.Authenticator.prototype.deserializeUser.arguments[0].data[0]._id
  // );
  let conditions = {
    _id: req.query._id,
    name: req.query.name,
    phone: req.query.phone,
    date_of_birth: req.query.date_of_birth,
    email: req.query.email,
    permission: req.query.permission,
    adress: req.query.adress
  };
  conditions = omitBy(conditions, isNil);
  handler
    .getList(conditions)
    .then((val) => res.json(val))
    .catch((err) => next(err));
});

router.get('/list/:id', (req, res, next) => {
  let id = req.params.id;
  handler
    .findById(id)
    .then((val) => res.json(val))
    .catch((err) => next(err));
});

router.put('/:id', (req, res, next) => {
  let id = req.params.id;
  let params = {...req.body};
  console.log('params: ', params);
  handler
    .putUpdate(id, params)
    .then((val) => res.json(val))
    .catch((err) => next(err));
});

router.delete('/:id', (req, res, next) => {
  let id = req.params.id;
  handler
    .deleteData(id)
    .then((val) => res.json(val))
    .catch((err) => next(err));
});

module.exports = router;
