const express = require('express');
const router = express.Router();
const handler = require('./handler');
const {omitBy, isNil} = require('lodash');

router.get('/', (req, res, next) => {
  console.log('req.query:', req.query);
  const {
    _id = undefined,
    film_id = undefined,
    customer_id = undefined
  } = req.query;
  let conditions = {
    _id: !_id ? undefined : require('mongodb').ObjectId(req.query._id),
    film_id: !film_id
      ? undefined
      : require('mongodb').ObjectId(req.query.film_id),
    customer_id: !customer_id
      ? undefined
      : require('mongodb').ObjectId(req.query.customer_id),
    content: req.query.content,
    rate: req.query.rate,
    limit: req.query.limit
  };
  conditions = omitBy(conditions, isNil);
  console.log('conditions:', conditions);
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
