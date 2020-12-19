// viết function xử lý tại
const modelCustomer = require('./../../models/customer.model');
const modelToken = require('./../../models/token.model');

const {validationResult} = require('express-validator');
const resSuccess = require('../../../responses/res-success');
const {createToken, intDate} = require('./../../../util');
var sha256 = require('crypto-js/sha256');
const moment = require('moment');
// nodejs
const createUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw {
        status: 402,
        errCode: 1,
        detail: errors.array()
      };
    }

    let user_shema = req.body;
    user_shema.password = sha256(req.body.password);
    let users = await modelCustomer.createByLamda(user_shema);

    // create token return token and expires_in
    let valueToken = await createToken(users[0]);
    let token_schema = {
      user_id: users[0]._id,
      token: valueToken.token,
      expires_in: +valueToken.expires_in,
      updated_at: moment()
    };

    let tokens = await modelToken.createByLamda(token_schema);

    res.json(
      resSuccess({
        user: users[0],
        token: tokens[0].token
      })
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser
};
