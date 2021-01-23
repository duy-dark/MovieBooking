const User = require('../../models/user.model');
const Token = require('./../../models/token.model');
const resSuccess = require('../../../responses/res-success');
const {validationResult} = require('express-validator');

const sha256 = require('crypto-js/sha256');

const login = (req, res, next) => {
  res.send('Form login');
};

var postLogin = async (req, res, next) => {
  console.log('chay cai nay');
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw {
        status: 402,
        errCode: 4,
        detail: errors.array()
      };
    }
    console.log('body:' + req.body);
    let email = req.body.email;
    console.log('email: ' + email);
    let password = sha256(req.body.password).toString();
    console.log('password: ' + password);
    let user = await User.findByEmailPassword({
      email: email,
      password: password
    });
    console.log('user: ' + JSON.stringify(user));
    if (user.length === 0 || user[0].isDeleted === true) {
      throw {
        status: 402,
        errCode: 5,
        detail: 'Invalid login'
      };
    }
    let token = await Token.findByLamda({user_id: user[0]._id});
    console.log('token:' + JSON.stringify(token));
    delete user[0]['password'];
    res.json(
      resSuccess({
        user: user[0],
        token: token[0].token
      })
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  postLogin
};
