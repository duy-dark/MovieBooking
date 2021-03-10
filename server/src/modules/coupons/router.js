const express = require('express');
const router = express.Router();
const handler = require('./handler');
const {omitBy, isNil} = require('lodash');

router.get('/', (req, res, next) => {
  const {_id = undefined, customer_id = undefined} = req.query;

  let conditions = {
    _id: !_id ? undefined : require('mongodb').ObjectId(req.query._id),
    customer_id: !customer_id
      ? undefined
      : require('mongodb').ObjectId(req.query.customer_id),
    type: req.query.type,
    coupons_status: req.query.coupons_status
  };
  conditions = omitBy(conditions, isNil);
  handler
    .getList(conditions)
    .then((val) => res.json(val))
    .catch((err) => next(err));
});

router.get('/:id', (req, res, next) => {
  let id = require('mongodb').ObjectId(req.params.id);
  handler
    .findById(id)
    .then((val) => res.json(val))
    .catch((err) => next(err));
});

router.get('/customer_id/:customer_id', (req, res, next) => {
  let customer_id = require('mongodb').ObjectId(req.params.customer_id);
  handler
    .findByCustomer_Id(customer_id)
    .then((val) => res.json(val))
    .catch((err) => next(err));
});

router.post('/', (req, res, next) => {
  let params = req.body;
  handler
    .postCreate(params)
    .then((val) => res.json(val))
    .catch((err) => next(err));
});

router.put('/:id', (req, res, next) => {
  let params = req.body;
  let id = require('mongodb').ObjectId(req.params.id);
  handler
    .putUpdate(id, params)
    .then((val) => res.json(val))
    .catch((err) => next(err));
});

router.put('/trigger/:id', (req, res, next) => {
  let id = require('mongodb').ObjectId(req.params.id);
  handler
    .triggeringCoupon(id)
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

module.exports = router;
