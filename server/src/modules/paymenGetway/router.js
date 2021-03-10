const express = require('express');
const router = express.Router();
const handler = require('./handler');
const {omitBy, isNil} = require('lodash');

router.post('/momoPayment', (req, res, next) => {
  let params = req.body;
  handler
    .momoApi(params)
    .then((val) => {
      res.json(val);
    })
    .catch((err) => next(err));
});
router.post('/checkStatusPayment', (req, res, next) => {
  console.log('hello');
  let params = req.body;
  //let transHistory=req.body;
  handler
    .checkStatusMomoApi(params)
    .then((val) => res.json(val))
    .catch((err) => next(err));
});

module.exports = router;
