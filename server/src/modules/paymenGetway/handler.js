const Model = require('./model');
const resSuccess = require('../../responses/res-success');
const {omitBy, isNil} = require('lodash');
const moment = require('moment');
const crypto = require('crypto');
const { v1: uuidv1 } = require('uuid');
const axios = require('axios')
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
let lambda={
  idUser : null,
  nameOfMovie: null,
  date: null,
  seatDetail: null,
  Theater: null,
  Money: null,
  };
  var signature;
const momoApi= async(params)=>{
    try{
      var orderId = uuidv1()
      var requestId = uuidv1()
      amount=params.amount;
      lambda={
    idUser:params.idUser ,
    nameOfMovie:params.nameOfMovie ,
    date : params.date ,
    seatDetail : params.seatDetail,
    Theater : params.Theater ,
    Money : params.amount
    };
  
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
 console.log(params)
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
  console.log("newsignature")
  console.log(newsignature)
 

  console.log(newsignature==params.signature)
    if(newsignature==params.signature){
     
        if (params.errorCode == 0){
        let data = await Model.createByLambda(lambda);

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
  
  module.exports = {
      momoApi,
      checkStatusMomoApi
  }