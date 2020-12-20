const User = require('../../models/user.model');
const resSuccess = require('./../../response/res-success');
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

    let email = req.body.email;
    console.log('email: ' + email);
    let password = sha256(req.body.password).toString();
    console.log('password: ' + password);
    let user = await User.findByEmailPassword({
      email: email,
      password: password
    });
    if (user.length === 0 || user[0].isDeleted === true) {
      throw {
        status: 402,
        errCode: 4,
        detail: 'user is not exist'
      };
    }

    delete user[0].password;
    res.json(
      resSuccess({
        user: user
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
