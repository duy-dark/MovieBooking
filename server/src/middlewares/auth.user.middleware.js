// const jwt = require('jsonwebtoken')
const resFail = require('../responses/res-fail');
const jwt = require('../jwt');

module.exports = async (req, res, next) => {
  let token = req.body.token || req.query.token || req.headers.authorization;
  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length).trimLeft();
  }
  if (token) {
    let payload = await jwt.decode(token);
    req.payload = payload;
    next();
  } else {
    res.status(403).json(resFail(1, 'do not send token'));
  }
};
