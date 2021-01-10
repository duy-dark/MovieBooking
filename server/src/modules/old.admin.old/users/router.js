const express = require('express');
const router = express.Router();
const handler = require('./handler');
const {validateUser} = require('./validated');

// router.get('/', handler.index);
router.get('/Users', handler.listUser);
router.get('/Users/:id', handler.findById);

router.post('/Users', handler.postCreate);
router.patch('/Users/:id', validateUser(), handler.patchUpdate);
router.delete('/Users/:id', handler.delete);

module.exports = router;
