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

router.post('/create', validator.validateRegisterCustomer(), async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw {
        status: 402,
        errCode: 1,
        detail: errors.array()
      }
    }

    let user = req.body
    user.password = sha256(req.body.password)
    let insertUser = await handler.insertUser(user)
    res.json(resSuccess({
      user: insertUser[0]
    }))
  } catch (error) {
    next(error);
  }
});

module.exports = router;
// viết define url api tại đây
