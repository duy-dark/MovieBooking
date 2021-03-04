const resSuccess = require('../../responses/res-success');
const moment = require('moment');
const crypto = require('crypto');
const {v1: uuidv1} = require('uuid');
const axios = require('axios');
const TicketHandle = require('../tickets/handler');
var endpoint = 'https://test-payment.momo.vn/gw_payment/transactionProcessor';
var hostname = 'https://test-payment.momo.vn';
var partnerCode = 'MOMOESSA20200911';
var accessKey = 'X46UaeYeKNwQ1Sg1';
var serectKey = 'TR1BbUHAIVuhHII1HvuJlzcTgqp1R73E';
var orderInfo = 'pay with MoMo';
var returnUrl = 'http://localhost:3000/complete?';
var notifyUrl =
  'https://servermoviebooking.herokuapp.com/api/payment/checkStatusPayment';
var requestType = 'captureMoMoWallet';
var extraData = 'merchantName=;merchantId=';
var amount;

const {transporter, contentMail, contentCode} = require('../../util/mail');
const {nexmo, sendSMS} = require('../../util/sms');

let ticket_id;
var signature;
const momoApi = async (params) => {
  try {
    var orderId = uuidv1();
    var requestId = uuidv1();
    amount = params.cost.toString();
    let lambda = {
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

    console.log(lambda);
    let data = await TicketHandle.postCreate(lambda);

    if (data.code !== 200) {
      throw {status: 400, detail: 'Create ticket failure'};
    }
    ticket_id = data.data._id;

    returnUrl = `http://localhost:3000/complete?email=${params.email}`;

    var rawSignature = `partnerCode=${partnerCode}&accessKey=${accessKey}&requestId=${requestId}&amount=${amount}&orderId=${orderId}&orderInfo=${orderInfo}&returnUrl=${returnUrl}&notifyUrl=${notifyUrl}&extraData=${extraData}`;

    signature = crypto
      .createHmac('sha256', serectKey)
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
      notifyUrl: notifyUrl,
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
    return resSuccess({url1: url1, url2: ticket_id});
  } catch (error) {
    throw {status: 400, detail: error};
  }
};

const checkStatusMomoApi = async (params) => {
  try {
    var _signature = `partnerCode=${params.partnerCode}&accessKey=${params.accessKey}&requestId=${params.requestId}&amount=${params.amount}&orderId=${params.orderId}&orderInfo=${params.orderInfo}&orderType=${params.orderType}&transId=${params.transId}&message=${params.message}&localMessage=${params.localMessage}&responseTime=${params.responseTime}&errorCode=${params.errorCode}&payType=${params.payType}&extraData=${params.extraData}`;

    console.log(_signature);
    let newsignature = crypto
      .createHmac('sha256', serectKey)
      .update(_signature)
      .digest('hex');
    // console.log('s2:', newsignature);
    // console.log(newsignature == params.signature);
    if (newsignature == params.signature) {
      if (params.errorCode == '0') {
        let update = await TicketHandle.putUpdate(ticket_id, {
          is_paid: true,
          momo_payment: true
        });
        // console.log('update:', update);
        if (update.code == 200) {
          // console.log('ticket update:', update);

          let ticket = await TicketHandle.findById(
            require('mongodb').ObjectID(ticket_id)
          );

          console.log('ticket:', ticket);

          let phone_number = ticket.data.phone_number
            .toString()
            .replace('0', '84');
          console.log('phone_number:', phone_number);

          let time_start = moment(ticket.data.film_schedules.time_start).format(
            'DD/MM/YYYY, HH:mm'
          );
          console.log('time_start:', time_start);

          let time_end = moment(ticket.data.film_schedules.time_end).format(
            'DD/MM/YYYY, HH:mm'
          );
          console.log('time_end:', time_end);

          const objSender = {
            id: ticket.data._id,
            code: ticket.data.code,
            film: ticket.data.film_schedules.film,
            address: ticket.data.film_schedules.address,
            room: ticket.data.film_schedules.room,
            theater: ticket.data.film_schedules.theater,
            seats: ticket.data.seats,
            count: ticket.data.count,
            cost: ticket.data.cost,
            customers: ticket.data.customers.name,
            phone_number: phone_number,
            payment: ticket.data.payment,
            time_start: time_start,
            time_end: time_end
          };

          console.log('objSender:', objSender);

          let mainOptions = {
            // thiết lập đối tượng, nội dung gửi mail
            from: 'doantotnghiepthang9@gmail.com',
            to: ticket.data.email,
            generateTextFromHTML: true,
            subject: 'Đặt vé thành công',
            html: contentMail(objSender) //Nội dung html mình đã tạo trên kia :))
          };

          console.log('Bat dau gui email');
          let rs = await transporter.sendMail(mainOptions, (err, info) => {
            if (err) {
              console.log('err:', err);
              throw {
                status: 204,
                detail: 'not send mail'
              };
            }

            console.log('info:', info);
            smtpTransport.close();
          });

          // let result = await sendSMS(objSender);
          // console.log('result sms', result);

          return {result: 'Success'};
        } else {
          console.log('Transaction Fail!');
          return {result: 'Transaction Fail!'};
        }
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
