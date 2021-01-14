const express = require('express');
const router = express.Router();
const handler = require('./handler');
const {omitBy, isNil} = require('lodash');
const passport = require('passport');

router.get(
  '/auth/google',
  handler.postLoginGoogle,
  passport.authenticate(
    'google',

    {scope: ['https://www.googleapis.com/auth/userinfo.profile email openid']}
  )
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/dasd'
  })
);

router.get('/', (req, res, next) => {
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

router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  handler
    .findById(id)
    .then((val) => res.json(val))
    .catch((err) => next(err));
});

router.post('/', (req, res, next) => {
  let params = {...req.body};
  handler
    .postCreate(params)
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

router.post('/login', (req, res, next) => {
  let params = {...req.body};
  handler
    .postLogin(params)
    .then((val) => res.json(val))
    .catch((err) => next(err));
});

module.exports = router;
