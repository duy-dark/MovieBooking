const express = require('express');
const router = express.Router();
const handler = require('./handler');
const moment = require('moment');
router.get('/getnow1', (req, res, next) => {
  let gte_match = new Date(moment('01/01/2000', 'MM/DD/YYYY').format());
  let lte_match = new Date(moment('01/01/2030', 'MM/DD/YYYY').format());
  // let gte_end = new Date(moment('01/01/2000', 'MM/DD/YYYY').format());
  // let lte_end = new Date(moment('09/09/9999', 'MM/DD/YYYY').format());
  console.log('oke');
  let params = {
    gte_match: gte_match,
    lte_match: lte_match
    // gte_end: gte_end,
    // lte_end: lte_end
  };

  handler
    .getNowShowing(params)
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
