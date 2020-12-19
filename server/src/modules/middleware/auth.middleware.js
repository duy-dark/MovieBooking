const jwt = require('jsonwebtoken');
const {secret_key} = require('./../../config');
const resFail = require('../../responses/res-fail');

module.exports = async (req, res, next) => {
  let token =
    req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, secret_key, (err, payload) => {
      if (err) {
        res.status(400).json(resFail(1));
      } else {
        req.token_payload = payload;
        next();
      }
    });
  } else {
    res.status(400).json(resFail(1, 'do not send token'));
  }
};
