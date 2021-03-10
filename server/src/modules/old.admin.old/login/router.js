const express = require('express');
const router = express.Router();
const handler = require('./handler');
const {validateLoginAdmin} = require('./validated');

router.get('/', handler.login);
router.post('/', validateLoginAdmin(), handler.postLogin);

module.exports = router;
