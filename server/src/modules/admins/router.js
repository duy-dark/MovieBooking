const express = require('express');
const router = express.Router();
const handler = require('./handler');

const verifyAdminToken = require('../../middlewares/auth.admin.middleware');

router.get('/', verifyAdminToken.requireGetList('admin'), (req, res, next) => {
  let query = {...req.query};
  handler
    .getList(query)
    .then((val) => res.json(val))
    .catch((err) => next(err));
});

router.get('/:id', verifyAdminToken.requireGetPerson, (req, res, next) => {
  let id = req.params.id;
  handler
    .findById(id)
    .then((val) => res.json(val))
    .catch((err) => next(err));
});

router.post('/', (req, res, next) => {
  let params = {...req.body};
  handler
    .postCreate(params)
    .then((val) => res.json(val))
    .catch((err) => next(err));
});

router.put('/:id', (req, res, next) => {
  let id = req.params.id;
  let params = {...req.body};
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

router.patch('/', (req, res, next) => {
  let id = req.params.id;
  let params = {...req.body};
  let adminOld = req.payload;
  handler
    .patchUpdateBySelf(id, params, adminOld)
    .then((val) => res.json(val))
    .catch((err) => next(err));
});

router.post('/login', (req, res, next) => {
  let params = {...req.body};
  handler
    .postLogin(params)
    .then((val) => res.json(val))
    .catch((err) => next(err));
});

module.exports = router;
