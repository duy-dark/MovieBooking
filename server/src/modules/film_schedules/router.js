const express = require('express');
const router = express.Router();
const handler = require('./handler');
const {omitBy, isNil} = require('lodash');
const moment = require('moment');

router.get('/', (req, res, next) => {
  let conditions = {
    _id: req.query._id,
    time_start: req.query.time_start,
    time_end: req.query.time_end,
    film_id: req.query.film_id,
    theater_id: req.query.theater_id,
    room_id: req.query.room_id
  };
  conditions = omitBy(conditions, isNil);
  handler
    .getList(conditions)
    .then((val) => res.json(val))
    .catch((err) => next(err));
});

router.get('/nowshowing', (req, res, next) => {
  handler
    .getNowShowing()
    .then((val) => res.json(val))
    .catch((err) => next(err));
});

router.get('/detail/:id', (req, res, next) => {
  let id = require('mongodb').ObjectId(req.params.id);
  handler
    .findById(id)
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

router.delete('/:id', (req, res, next) => {
  let id = require('mongodb').ObjectId(req.params.id);
  handler
    .deleteData(id)
    .then((val) => res.json(val))
    .catch((err) => next(err));
});

module.exports = router;
