const Model = require('../tickets/model');
const resSuccess = require('../../responses/res-success');
const {omitBy, isNil, toString} = require('lodash');
const moment = require('moment');
const crypto = require('crypto');
const { v1: uuidv1 } = require('uuid');
var sha256 = require('sha256');
const axios = require('axios')
const Nexmo = require('nexmo');
var endpoint = "https://test-payment.momo.vn/gw_payment/transactionProcessor"
var hostname = "https://test-payment.momo.vn"
var partnerCode = "MOMOESSA20200911"
var accessKey = "X46UaeYeKNwQ1Sg1"
var serectkey = "TR1BbUHAIVuhHII1HvuJlzcTgqp1R73E"
var orderInfo = "pay with MoMo"
var returnUrl = "https://momo.vn/return"
var notifyurl = "https://serene-springs-21211.herokuapp.com/api/paymentgetway/checkStatusPayment"
var requestType = "captureMoMoWallet"
var extraData = "merchantName=;merchantId=" 
var amount;
const nodemailer = require("nodemailer")
var dateFormat = require('dateformat');
var querystring = require('qs');
const nexmo = new Nexmo({
  apiKey: 'fda2b804',
  apiSecret: 'isys39DknyEEmjLo',
});
let lambda={
  seat_ids : null,
  count: null,
  cost: null,
  customer_id: null,
  film_schedule_id: null,
  voucher_id: null,
  email:null,
  phone_number:null,
  payment:null,
  is_deleted:null,
  created_at:null, 
  updated_at:null
  };
  var signature;
  const transporter = nodemailer.createTransport({
    // config mail server
    service: 'gmail',
    auth: {
      user: 'doantotnghiepthang9@gmail.com',
      pass: 'doantotnghiep@',
    },
  })
const momoApi= async(params)=>{
    try{
      var orderId = uuidv1()
      var requestId = uuidv1()
      amount= params.cost.toString();
      lambda={
        seat_ids : params.seat_ids,
        count: params.count,
        cost: params.cost,
        customer_id: params.customer_id,
        film_schedule_id: params.film_schedule_id,
        voucher_id: params.voucher_id,
        email:params.email,
        phone_number:params.phone_number,
        payment:params.payment,
        is_deleted:params.is_deleted,
        created_at:params.created_at, 
        updated_at:params.updated_at    
      };
      console.log(lambda)
  var rawSignature = "partnerCode="+partnerCode+
  "&accessKey="+accessKey+
  "&requestId="+requestId+
  "&amount="+amount+
  "&orderId="+orderId+
  "&orderInfo="+orderInfo+
  "&returnUrl="+returnUrl+
  "&notifyUrl="+notifyurl+
  "&extraData="+extraData

   signature = crypto.createHmac('sha256', serectkey)
                     .update(rawSignature)
                     .digest('hex');
                     
                     var body = JSON.stringify({
                      partnerCode : partnerCode,
                      accessKey : accessKey,
                      requestId : requestId,
                      amount : amount,
                      orderId : orderId,
                      orderInfo : orderInfo,
                      returnUrl : returnUrl,
                      notifyUrl : notifyurl,
                      extraData : extraData,
                      requestType : requestType,
                      signature : signature,
                  })
    
    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(body)
      }
    };
    const getPayurl=async()=>{return await axios.post('https://test-payment.momo.vn/gw_payment/transactionProcessor', body, axiosConfig)
  .then((res) => {
      
       return res.data.payUrl;
  })
  .catch((err) => {
    console.log("AXIOS ERROR: ", err);
  })}
  var url1 = await getPayurl();
  return url1;
  } 
  catch (error) {
    throw {status: 400, detail: error};
  }}
 
const checkStatusMomoApi= async (params)=>{

try{

   var _signature="partnerCode="+params.partnerCode+
   "&accessKey="+params.accessKey+
   "&requestId="+params.requestId+
   "&amount="+params.amount+
   "&orderId="+params.orderId+
   "&orderInfo="+params.orderInfo+
   "&orderType="+params.orderType+
   "&transId="+params.transId+
   "&message="+params.message+
   "&localMessage="+params.localMessage+
   "&responseTime="+params.responseTime+
   "&errorCode="+params.errorCode+
   "&payType="+params.payType+
   "&extraData="+params.extraData;
   console.log(_signature)
  newsignature = crypto.createHmac('sha256', serectkey)
  .update(_signature)
  .digest('hex');
 

 

  console.log(newsignature==params.signature)
    if(newsignature==params.signature){
     
        if (params.errorCode == '0'){
        //let data = await Model.createByLambda(lambda);
        console.log(lambda.email)
        sendQRcodetoEmail(lambda.email)
        const from = 'Vonage APIs';
       
        const text = 'hi this is a test';
       try{
        
        nexmo.message.sendSms(from, lambda.phone_number, text);}
        catch (error){ console.log(error.toString())}
        console.log("Success");
      return({"result":"Success"}) 
      }
        else {
          console.log("Transaction Fail!");
          return ({"result":"Transaction Fail!"})
        }
    }
        else {
          console.log("DATA ATTACKED!!!");
          return({"result":"DATA ATTACKED!!!"}) 
        }
  
    
  }
 
 catch (error) {
    throw {status: 400, detail: error};
  }
}
const momo_Return = async (params)=>{
 
  
  var _signature="partnerCode="+params.partnerCode+
  "&accessKey="+params.accessKey+
  "&requestId="+params.requestId+
  "&amount="+params.amount+
  "&orderId="+params.orderId+
  "&orderInfo="+params.orderInfo+
  "&orderType="+params.orderType+
  "&transId="+params.transId+
  "&message="+params.message+
  "&localMessage="+params.localMessage+
  "&responseTime="+params.responseTime+
  "&errorCode="+params.errorCode+
  "&payType="+params.payType+
  "&extraData="+params.extraData;
 
 newsignature = crypto.createHmac('sha256', serectkey)
 .update(_signature)
 .digest('hex');
 if(newsignature==params.signature){
     
  if (params.errorCode == 0){
 
return({"result":"Success"}) 
}
  else {
   
    return ({"result":"Fail!"})
  }
}
  else {
    console.log("DATA ATTACKED!!!");
    return({"result":"DATA ATTACKED!!!"}) 
  }
 

}
const vnpayApi = async (params,ipAddr)=>{
  try{



    var tmnCode = 'LE5WW0KK'
    var secretKey = 'WXLMCTZFUPGTUYMNXWNJPZTLUDCATKTF'
    var vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html'
    var returnUrl = 'https://facebook.com' // gắn trang thông báo kết quả frontend
    
    var date = new Date();
    
    var createDate = dateFormat(date, 'yyyymmddHHmmss');
    var _orderId = dateFormat(date, 'HHmmss');
    var _amount = params.amount;
    var bankCode = params.bankCode;
    
    var _orderInfo = params.orderDescription;
    var _orderType = params.orderType;
    var locale = 'vn';
    var currCode = 'VND';
    var vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.0.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    // vnp_Params['vnp_Merchant'] = ''
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = _orderId;
    vnp_Params['vnp_OrderInfo'] = _orderInfo;
    vnp_Params['vnp_OrderType'] = _orderType;
    vnp_Params['vnp_Amount'] =parseInt(_amount * 100);
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] =  parseInt(createDate);
    vnp_Params['vnp_BankCode'] = bankCode;
    
    vnp_Params = sortObject(vnp_Params);
  
    var signData = secretKey + querystring.stringify(vnp_Params, { encode: false });
    
    var sha256 = require('sha256');
    
    var secureHash = sha256(signData);
    
    vnp_Params['vnp_SecureHashType'] =  'SHA256';
    vnp_Params['vnp_SecureHash'] = secureHash;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: true });
    

//Neu muon dung Redirect thi dong dong ben duoi
 return (vnpUrl)
//Neu muon dung Redirect thi mo dong ben duoi va dong dong ben tren
//res.redirect(vnpUrl)
  }
  catch (error) {
    throw {status: 400, detail: error};
  }

}
const vnpay_ipn =async (params)=>{
  var vnp_Params = params;
  var secureHash = vnp_Params['vnp_SecureHash'];

  delete vnp_Params['vnp_SecureHash'];
  delete vnp_Params['vnp_SecureHashType'];

  vnp_Params = sortObject(vnp_Params);
  
  var secretKey = 'WXLMCTZFUPGTUYMNXWNJPZTLUDCATKTF'
  var querystring = require('qs');
  var signData = secretKey + querystring.stringify(vnp_Params, { encode: false });
  
  var sha256 = require('sha256');

  var checkSum = sha256(signData);

  if(secureHash === checkSum){
      var orderId = vnp_Params['vnp_TxnRef'];
      var rspCode = vnp_Params['vnp_ResponseCode'];
      console.log("success")
      //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
      return({RspCode: '00', Message: 'success'})
  }
  else {
    console.log("fail")
      return({RspCode: '97', Message: 'Fail checksum'})
  }
}
const vnpay_Return = async (params)=>{
 
    var vnp_Params = params;

    var secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);

    
    var tmnCode = 'LE5WW0KK'
    var secretKey = 'WXLMCTZFUPGTUYMNXWNJPZTLUDCATKTF'

    var querystring = require('qs');
    var signData = secretKey + querystring.stringify(vnp_Params, { encode: false });

    var sha256 = require('sha256');

    var checkSum = sha256(signData);

    if(secureHash === checkSum){
        //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua

        return( {code: vnp_Params['vnp_ResponseCode']})
    } else{
        return({code : "-1"})
    }

}
function sortObject(o) {
  var sorted = {},
      key, a = [];

  for (key in o) {
      if (o.hasOwnProperty(key)) {
          a.push(key);
      }
  }

  a.sort();

  for (key = 0; key < a.length; key++) {
      sorted[a[key]] = o[a[key]];
  }
  return sorted;
}
async function sendQRcodetoEmail(email){

  
  const mainOptions = {
    // thiết lập đối tượng, nội dung gửi mail
    from: 'DATN',
    to: email,
    subject: 'Ma Qr cua ban',
    text: 'You recieved message from " + "doantotnghiepthang9@gmail.com',
    html: `
        <h3>Xin chào , </h3>
        <p>Ban da mua ve xem phim thanh cong</p>
        `
  }
  
   await transporter.sendMail(mainOptions,  (err, info) => {
    
    if (err) {
      console.log("send mail error")
      console.log(err.toString())
    } 
  })
}
  module.exports = {
      momoApi,
      checkStatusMomoApi,
      momo_Return,
      vnpayApi,
      vnpay_ipn,
      vnpay_Return
  }