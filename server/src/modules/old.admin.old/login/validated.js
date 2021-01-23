const {check} = require('express-validator');
const validateLoginAdmin = () => {
  return [
    check('email', 'Invalid does not Empty').not().isEmpty(),
    check('email', 'Email is not invalid').isEmail(),
    check('password', 'password more than 6 degits').isLength({min: 6})
  ];
};

module.exports = {
  validateLoginAdmin
};
