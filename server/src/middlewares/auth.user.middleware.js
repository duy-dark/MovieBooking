// const jwt = require('jsonwebtoken')
const resFail = require('../responses/res-fail');
const jwt = require('../jwt');

module.exports = {
  requireByUser: async (req, res, next) => {
    try {
      let token =
        req.body.token ||
        req.query.token ||
        req.headers.authorization ||
        req.session.passport.user.data.token;
      console.log('token:', token);
      if (token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length).trimLeft();
      }
      if (token) {
        let payload = await jwt.decode(token);
        req.payload = payload;
        console.log('payload:', payload);
        next();
      } else {
        res.status(403).json(resFail(1, 'Do not send token'));
      }
    } catch (error) {
      res.status(403).json(resFail(1, error));
    }
  },

  requireGetPerson: async (req, res, next) => {
    try {
      let token =
        req.body.token ||
        req.query.token ||
        req.headers.authorization ||
        req.session.passport.user.data.token;
      if (token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length).trimLeft();
      }
      if (token) {
        let payload = jwt.decode(token);
        req.payload = payload;
        console.log('payload.account: ', payload.account);
        if (payload.account._id === req.params.id) {
          next();
        } else {
          res.status(403).json(resFail(1, 'Invaild token'));
        }
      } else {
        res.status(403).json(resFail(1, 'Do not send token'));
      }
    } catch (error) {
      res.status(403).json(resFail(1, error));
    }
  }
};
