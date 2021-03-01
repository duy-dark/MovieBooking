const Model = require('../tickets/model');
const resSuccess = require('../../responses/res-success');
const {omitBy, isNil, toString} = require('lodash');
const moment = require('moment');
const crypto = require('crypto');
const {v1: uuidv1} = require('uuid');
var sha256 = require('sha256');
const axios = require('axios');
const Nexmo = require('nexmo');
const ticket = require('../tickets/handler');
var endpoint = 'https://test-payment.momo.vn/gw_payment/transactionProcessor';
var hostname = 'https://test-payment.momo.vn';
var partnerCode = 'MOMOESSA20200911';
var accessKey = 'X46UaeYeKNwQ1Sg1';
var serectkey = 'TR1BbUHAIVuhHII1HvuJlzcTgqp1R73E';
var orderInfo = 'pay with MoMo';
var returnUrl = 'http://localhost:3000/complete?';
var notifyurl = 'https://b6f779ec3a34.ngrok.io/api/payment/checkStatusPayment';
var requestType = 'captureMoMoWallet';
var extraData = 'merchantName=;merchantId=';
var amount;
const nodemailer = require('nodemailer');
var dateFormat = require('dateformat');
var querystring = require('qs');
const nexmo = new Nexmo({
  apiKey: 'fda2b804',
  apiSecret: 'isys39DknyEEmjLo'
});
let lambda = {};
var signature;
const momoApi = async (params) => {
  try {
    var orderId = uuidv1();
    var requestId = uuidv1();
    amount = params.cost.toString();
    lambda = {
      seats: params.seats,
      count: params.count,
      cost: params.cost,
      customer_id: params.customer_id,
      film_schedule_id: params.film_schedule_id,
      voucher_id: params.voucher_id,
      email: params.email,
      phone_number: params.phone_number,
      payment: params.payment,
      is_deleted: params.is_deleted,
      booking_time: params.booking_time
    };
    console.log('lambda:', lambda);
    returnUrl += 'email=' + params.email;
    var rawSignature =
      'partnerCode=' +
      partnerCode +
      '&accessKey=' +
      accessKey +
      '&requestId=' +
      requestId +
      '&amount=' +
      amount +
      '&orderId=' +
      orderId +
      '&orderInfo=' +
      orderInfo +
      '&returnUrl=' +
      returnUrl +
      '&notifyUrl=' +
      notifyurl +
      '&extraData=' +
      extraData;

    signature = crypto
      .createHmac('sha256', serectkey)
      .update(rawSignature)
      .digest('hex');

    console.log('s1:', signature);

    var body = JSON.stringify({
      partnerCode: partnerCode,
      accessKey: accessKey,
      requestId: requestId,
      amount: amount,
      orderId: orderId,
      orderInfo: orderInfo,
      returnUrl: returnUrl,
      notifyUrl: notifyurl,
      extraData: extraData,
      requestType: requestType,
      signature: signature
    });

    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body)
      }
    };
    const getPayurl = async () => {
      return await axios
        .post(
          'https://test-payment.momo.vn/gw_payment/transactionProcessor',
          body,
          axiosConfig
        )
        .then((res) => {
          return res.data.payUrl;
        })
        .catch((err) => {
          console.log('AXIOS ERROR: ', err);
        });
    };
    var url1 = await getPayurl();
    return resSuccess(url1);
  } catch (error) {
    throw {status: 400, detail: error};
  }
};

const checkStatusMomoApi = async (params) => {
  try {
    console.log('params:', params);
    var _signature =
      'partnerCode=' +
      params.partnerCode +
      '&accessKey=' +
      params.accessKey +
      '&requestId=' +
      params.requestId +
      '&amount=' +
      params.amount +
      '&orderId=' +
      params.orderId +
      '&orderInfo=' +
      params.orderInfo +
      '&orderType=' +
      params.orderType +
      '&transId=' +
      params.transId +
      '&message=' +
      params.message +
      '&localMessage=' +
      params.localMessage +
      '&responseTime=' +
      params.responseTime +
      '&errorCode=' +
      params.errorCode +
      '&payType=' +
      params.payType +
      '&extraData=' +
      params.extraData;

    console.log(_signature);
    let newsignature = crypto
      .createHmac('sha256', serectkey)
      .update(_signature)
      .digest('hex');
    console.log('s2:', newsignature);
    console.log(newsignature == params.signature);
    if (newsignature == params.signature) {
      if (params.errorCode == '0') {
        let data = await ticket.postCreate(lambda);
        return {result: 'Success'};
      } else {
        console.log('Transaction Fail!');
        return {result: 'Transaction Fail!'};
      }
    } else {
      console.log('DATA ATTACKED!!!');
      return {result: 'DATA ATTACKED!!!'};
    }
  } catch (error) {
    throw {status: 400, detail: error};
  }
};

module.exports = {
  momoApi,
  checkStatusMomoApi
};
