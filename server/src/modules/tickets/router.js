const express = require('express');
const router = express.Router();
const handler = require('./handler');
const {omitBy, isNil} = require('lodash');

router.get('/', (req, res, next) => {
  let conditions = {
    _id: req.query._id,
    count: req.query.count,
    booking_time: req.query.booking_time,
    cost: req.query.cost,
    customer_id: req.query.customer_id,
    film_schedule_id: req.query.film_schedule_id,
    voucher_id: req.query.voucher_id,
    seats: req.query.seats
  };
  conditions = omitBy(conditions, isNil);
  handler
    .getList(conditions)
    .then((val) => res.json(val))
    .catch((err) => next(err));
});

router.get('/:id/detail', (req, res, next) => {
  let id = require('mongodb').ObjectId(req.params.id);
  handler
    .findById(id)
    .then((val) => res.json(val))
    .catch((err) => next(err));
});

router.get('/schedule_id/:schedule_id', (req, res, next) => {
  // console.log('asdasdsa');
  let schedule_id = require('mongodb').ObjectId(req.params.schedule_id);
  handler
    .getTicket(schedule_id)
    .then((val) => res.json(val))
    .catch((err) => next(err));
});

router.post('/', (req, res, next) => {
  console.log('hello');
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

router.delete('/:id', (req, res, next) => {
  let id = require('mongodb').ObjectId(req.params.id);
  handler
    .deleteData(id)
    .then((val) => res.json(val))
    .catch((err) => next(err));
});

module.exports = router;
