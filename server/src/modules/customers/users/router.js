const express = require('express');
const handler = require('./handler');
const router = express.Router();
const validator = require('./validated');
const {validationResult} = require('express-validator');
const resFail = require('./../../response/res-fail');
const resSuccess = require('./../../response/res-success');
var sha256 = require("crypto-js/sha256");

router.get('/', (req, res, next) => {
  res.json('here is user');
});

router.post('/create', validator.validateRegisterCustomer(), (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(402).json(resFail(1, errors.array()));
    return;
  }

  let user = req.body
  user.password = sha256(req.body.password)
  return handler
    .insertUser(user)
    .then(rows => {
      console.log(rows[0])
      res.status(200).json(resSuccess({
        user: rows[0]
      }));
    })
    .catch((err) => next(err));
});

module.exports = router;
// viết define url api tại đây
