const express = require('express');
const handler = require('./handler');
const router = express.Router();
const {createUser} = require('./handler')
const validator = require('./validated');


router.get('/', (req, res, next) => {
  res.json('here is user');
});

router.post('/create', validator.validateRegisterCustomer(), createUser);

module.exports = router;
// viết define url api tại đây
