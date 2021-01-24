const {check} = require('express-validator');
const validateUser = () => {
  return [
    check('email', 'Invalid does not Empty').not().isEmpty(),
    check('email', 'Email is not invalid').isEmail(),
    check('password', 'password more than 6 degits').isLength({min: 6})
    // invalid user
  ];
};

module.exports = {
  validateUser
};
