const Nexmo = require('nexmo');

const nexmo = new Nexmo({
  apiKey: '023dea62',
  apiSecret: 'w4eXN8dbIu96kaAT'
});
const sendSMS = (objectSms) => {
  const from = 'Vonage APIs';
  const to = '+84838263357';
  const text = `Dat ve thanh cong
  Ma: ${objectSms.id}
  So ghe:${objectSms.count}
  Ghe:${objectSms.seats}
  Gia:${objectSms.cost}
  Ten:${objectSms.customers}
  SDT:${objectSms.phone_number}
  Thanh toan:${objectSms.payment}
  Bat dau:${objectSms.time_start}
  Het:${objectSms.time_end}
  Rap:${objectSms.theater}
  Phong:${objectSms.room}`;
  return nexmo.message.sendSms(from, to, text);
};
module.exports = {nexmo, sendSMS};

// const Vonage = require('@vonage/server-sdk');

// const vonage = new Vonage({
//   apiKey: '023dea62',
//   apiSecret: 'w4eXN8dbIu96kaAT'
// });
// // const sendSms = (objSms) => {
// const from = 'WMH';
// const to = '+84838263357';
// const text = 'ok sms';

// vonage.message.sendSms(from, to, text, (err, responseData) => {
//   if (err) {
//     console.log(err);
//   } else {
//     if (responseData.messages[0]['status'] === '0') {
//       console.log('Message sent successfully.');
//     } else {
//       console.log(
//         `Message failed with error: ${responseData.messages[0]['error-text']}`
//       );
//     }
//   }
// });
// // };
// // module.exports = {sendSms};
