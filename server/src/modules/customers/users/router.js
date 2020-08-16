const express = require('express');
const handler = require('./handler');
const router = express.Router();

router.get('/create', (req, res, next) => {
  return handler
    .login(req.body)
    .then((val) => {
      res.json(val);
    })
    .catch((err) => next(err));
});

module.exports = router;
// viết define url api tại đây
