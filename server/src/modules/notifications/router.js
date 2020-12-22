const express = require('express');
const router = express.Router();
const handler = require('./handler');

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
