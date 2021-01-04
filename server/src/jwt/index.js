const {privateKey, publicKey} = require('../config');

const jwt = require('jsonwebtoken');
const encode = (data) => {
  let payload = {
    account: data,
    info: 'Token is valid'
  };
  return jwt.sign(payload, privateKey, {algorithm: 'RS256'});
};

const decode = (token) => {
  return jwt.verify(token, publicKey);
};

module.exports = {encode, decode};
