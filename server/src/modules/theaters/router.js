const express = require('express');
const router = express.Router();
const handler = require('./handler');
const {omitBy, isNil} = require('lodash');

router.get('/', (req, res, next) => {
  let conditions = {
    _id: req.query._id,
    name: req.query.name,
    address: req.query.address,
    url_image: req.query.url_image,
    comment: req.query.comment,
    room_ids: req.query.room_ids
  };
  conditions = omitBy(conditions, isNil);
  handler
    .getList(conditions)
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

router.get('/getfilmtoday', (req, res, next) => {
  handler
    .getFilmToDay()
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

router.get('/:id/detail', (req, res, next) => {
  let id = require('mongodb').ObjectId(req.params.id);
  handler
    .getTheater7Day(id)
    .then((val) => res.json(val))
    .catch((err) => next(err));
});

module.exports = router;
