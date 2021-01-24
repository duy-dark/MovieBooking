const express = require('express');
const router = express.Router();
const handler = require('./handler');
const moment = require('moment');
const {omitBy, isNil} = require('lodash');

router.get('/nowshowing', (req, res, next) => {
  console.log('oke');
  let gte_start_date = new Date(moment('2020-01-01', moment.ISO_8601));
  let lte_start_date = new Date(moment.now());
  console.log('oke');
  let params = {
    gte_start_date: gte_start_date,
    lte_start_date: lte_start_date
  };

  handler
    .getFilmInPeriod(params)
    .then((val) => res.json(val))
    .catch((err) => next(err));
});

router.get('/:id/getcomment', (req, res, next) => {
  //let id = require('mongodb').ObjectId(req.params.id);
  handler
    .getcomment(req.params.id)
    .then((val) => res.json(val))
    .catch((err) => next(err));
});
router.get('/commingson', (req, res, next) => {
  console.log('oke');
  let gte_start_date = new Date(moment.now());
  let lte_start_date = new Date(moment('2030-01-01', moment.ISO_8601));
  console.log('oke');
  let params = {
    gte_start_date: gte_start_date,
    lte_start_date: lte_start_date
  };

  handler
    .getFilmInPeriod(params)
    .then((val) => res.json(val))
    .catch((err) => next(err));
});

router.get('/', (req, res, next) => {
  let conditions = {
    _id: req.query._id,
    name: req.query.name,
    content: req.query.content,
    countries: req.query.countries,
    long_time: req.query.long_time,
    start_date: req.query.start_date,
    directors: req.query.directors,
    actors: req.query.actors,
    rates: req.query.rates,
    rate_count: req.query.rate_count,
    imdb: req.query.imdb,
    digitals: req.query.digitals,
    url_avatar: req.query.url_avatar,
    url_background: req.query.url_background,
    is_blockbuster: req.query.is_blockbuster,
    category_ids: req.query.category_ids
  };
  conditions = omitBy(conditions, isNil);
  handler
    .getList(conditions)
    .then((val) => res.json(val))
    .catch((err) => next(err));
});

router.get('/detail', (req, res, next) => {
  let conditions = {
    _id: req.query._id,
    name: req.query.name,
    trailer: req.query.trailer,
    content: req.query.content,
    countries: req.query.countries,
    long_time: req.query.long_time,
    start_date: req.query.start_date,
    directors: req.query.directors,
    actors: req.query.actors,
    rates: req.query.rates,
    rate_count: req.query.rate_count,
    imdb: req.query.imdb,
    digitals: req.query.digitals,
    url_avatar: req.query.url_avatar,
    url_background: req.query.url_background,
    is_blockbuster: req.query.is_blockbuster,
    category_ids: req.query.category_ids
  };
  conditions = omitBy(conditions, isNil);
  handler
    .getDetail(conditions)
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

router.post('/create/:id', (req, res, next) => {
  let params = req.body;
  handler
    .postComment(params)
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
