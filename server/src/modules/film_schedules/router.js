const express = require('express');
const router = express.Router();
const handler = require('./handler');
const {omitBy, isNil} = require('lodash');
const moment = require('moment');
const {Model} = require('mongoose');

router.get('/', (req, res, next) => {
  const {
    _id = undefined,
    film_id = undefined,
    theater_id = undefined,
    room_id = undefined
  } = req.query;

  let conditions = {
    _id: !_id ? undefined : require('mongodb').ObjectId(req.query._id),
    time_start: req.query.time_start,
    time_end: req.query.time_end,
    film_id: !film_id
      ? undefined
      : require('mongodb').ObjectId(req.query.film_id),
    theater_id: !theater_id
      ? undefined
      : require('mongodb').ObjectId(req.query.theater_id),
    room_id: !room_id
      ? undefined
      : require('mongodb').ObjectId(req.query.room_id)
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

router.get('/statistic/room_id/:room_id', (req, res, next) => {
  let room_id = require('mongodb').ObjectId(req.params.room_id);
  console.log('day:', req.query.day);
  let day = moment(req.query.day);
  console.log('day:', new Date(day));

  console.log('day:', day);

  handler
    .statisticByday(room_id, day)
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

// router.put('/updatetimeend/film_id/:film_id', (req, res, next) => {
//   let long_time = req.body.long_time;
//   let film_id = require('mongodb').ObjectId(req.params.film_id);
//   console.log(film_id);
//   //let film = Model.findById(film_id, id);

//   handler
//     .putUpdateSchedule(film_id, long_time)
//     .then((val) => res.json(val))
//     .catch((err) => next(err));
// });

router.delete('/:id', (req, res, next) => {
  let id = require('mongodb').ObjectId(req.params.id);
  handler
    .deleteData(id)
    .then((val) => res.json(val))
    .catch((err) => next(err));
});

module.exports = router;
