const express = require('express');
const router = express.Router();
const handler = require('./handler');
const {omitBy, isNil} = require('lodash');

router.get('/momoPayment',(req,res,next)=>{
    let params=req.body;
    handler
    .momoApi(params)
    .then((val) => {res.json(val)})
    .catch((err) => next(err));
  })
router.post('/checkStatusPayment',(req,res,next)=>{
  let params=req.body;
  //let transHistory=req.body;
  handler
  .checkStatusMomoApi(params)
  .then((val)=>res.json(val))
  .catch((err) => next(err));
})
router.get('/momoReturn',(req,res,next)=>{
  let params=req.query;
  handler
  .momo_Return(params)
  .then((val)=>{res.json(val)})
  .catch((err) => next(err));
})
router.post('/vnpayment',(req,res,next)=>{
  let params=req.body;
  var ipAddr = req.headers['x-forwarded-for']
  handler
  .vnpayApi(params,ipAddr)
  .then((val) => {res.json(val)})
  .catch((err) => next(err));
})
router.get('/vnpayIpn',(req,res,next)=>{
  let params=req.query;
  console.log(params)
  handler
  .vnpay_Return(params)
  .then((val)=>{res.json(val)})
  .catch((err) => next(err));
})
router.get('/vnpayReturn',(req,res,next)=>{
  let params=req.query;
  handler
  .vnpay_Return(params)
  .then((val)=>{res.json(val)})
  .catch((err) => next(err));
})
  
  module.exports = router;