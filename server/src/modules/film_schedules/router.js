const express = require('express');
const router = express.Router();
const handler = require('./handler');
const {omitBy, isNil} = require('lodash');
const moment = require('moment');

router.get('/getnow', (req, res, next) => {
  let gte_match = new Date(moment('01/01/2000', MM / DD / YYYY).format());
  let lte_match = new Date(moment('01/01/2050', MM / DD / YYYY).format());
  let gte_end = new Date(moment('01/01/2000', MM / DD / YYYY).format());
  let lte_end = new Date(moment('09/09/9999', MM / DD / YYYY).format());

  let params = {
    gte_match: gte_match,
    lte_match: lte_match,
    gte_end: gte_end,
    lte_end: lte_end
  };
  handler
    .getNowShowing(params)
    .then((val) => res.json(val))
    .catch((err) => next(err));
});

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

router.get('/detail/:id', (req, res, next) => {
  let id = req.params.id;
  handler
    .findById(id)
    .then((val) => res.json(val))
    .catch((err) => next(err));
});

router.get('/getfilmtoday', (req, res, next) => {
  handler
    .getFilmToDay()
    .then((val) => res.json(val))
    .catch((err) => next(err));
});

router.get('/getfilm7day/:film_id', (req, res, next) => {
  let film_id = req.params.film_id;
  handler
    .getFilm7Day(film_id)
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
  let id = req.params.id;
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
