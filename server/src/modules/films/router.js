const express = require('express');
const router = express.Router();
const handler = require('./handler');
const moment = require('moment');

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
  handler
    .getAll()
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
