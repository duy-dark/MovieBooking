const express = require('express');
const router = express.Router();
const handler = require('./handler');
const {omitBy, isNil} = require('lodash');

const verifyAdminToken = require('../../middlewares/auth.admin.middleware');

router.get(
  '/',
  // verifyAdminToken.requireByPermission('read_admin'),
  (req, res, next) => {
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
  }
);

router.get(
  '/getdetail',
  // verifyAdminToken.requireByPermission('read_admin'),
  (req, res, next) => {
    const {_id = undefined} = req.query;

    let conditions = {
      _id: !_id ? undefined : require('mongodb').ObjectId(req.query._id),
      name: req.query.name,
      phone: req.query.phone,
      date_of_birth: req.query.date_of_birth,
      email: req.query.email,
      permission: req.query.permission,
      adress: req.query.adress
    };
    conditions = omitBy(conditions, isNil);
    handler
      .getDetail(conditions)
      .then((val) => res.json(val))
      .catch((err) => next(err));
  }
);

router.get('/:id', (req, res, next) => {
  let id = require('mongodb').ObjectId(req.params.id);
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
  let id = require('mongodb').ObjectId(req.params.id);
  let params = {...req.body};
  console.log('params: ', params);
  handler
    .putUpdate(id, params)
    .then((val) => res.json(val))
    .catch((err) => next(err));
});

router.delete('/:id', (req, res, next) => {
  let id = require('mongodb').ObjectId(req.params.id);
  handler
    .deleteData(id)
    .then((val) => res.json(val))
    .catch((err) => next(err));
});

//patchUpdateBySelf
// router.patch('/', (req, res, next) => {
//   let id = req.params.id;
//   let params = {...req.body};
//   let adminOld = req.payload;
//   handler
//     .patchUpdateBySelf(id, params, adminOld)
//     .then((val) => res.json(val))
//     .catch((err) => next(err));
// });

router.post('/login', (req, res, next) => {
  let params = {...req.body};
  handler
    .postLogin(params)
    .then((val) => res.json(val))
    .catch((err) => next(err));
});

module.exports = router;
