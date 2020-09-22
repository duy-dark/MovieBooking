const express = require('express');
const handler = require('./handler');
const router = express.Router();
const validator = require('./validated');
const {validationResult} = require('express-validator');
const resSuccess = require('./../../response/res-success');
const { createToken, intDate } = require('./../../../util')
var sha256 = require("crypto-js/sha256");
const moment = require('moment')


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
    let user_shema = req.body
    user_shema.password = sha256(req.body.password)
    let users = await handler.insertUser(user_shema)
    
    // create token return token and expires_in
    let valueToken = await createToken(users[0])
    let token_schema = {
      user_id: users[0]._id,
      token: valueToken.token,
      expires_in: +valueToken.expires_in,
      updated_at: moment()
    }

    let tokens = await handler.insertToken(token_schema)
    res.json(resSuccess({
      user: users[0],
      token: tokens[0].token
    }))
  } catch (error) {
    next(error);
  }
});

module.exports = router;
// viết define url api tại đây
