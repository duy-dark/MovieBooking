const Nexmo = require('nexmo');

const nexmo = new Nexmo({
  apiKey: '05dfc6fc',
  apiSecret: 'VR1xFhIVah5ejYGO'
});
const sendSMS = (objectSms) => {
  const from = 'Vonage APIs';
  // const to = '84961600292';
  const to = objectSms.phone_number;
  const text = `Dat ve thanh cong
  Ma: ${objectSms.code}
  Phim: ${objectSms.film}
  Ghe:${objectSms.seats}
  SDT:${objectSms.phone_number}
  Thanh toan:${objectSms.payment}
  Thoi gian:${objectSms.time_start}
  Rap:${objectSms.theater}
  Phong:${objectSms.room}`;
  return nexmo.message.sendSms(from, to, text);
};
module.exports = {nexmo, sendSMS};

// const Vonage = require('@vonage/server-sdk');

// const vonage = new Vonage({
//   apiKey: '05dfc6fc',
//   apiSecret: 'VR1xFhIVah5ejYGO'
// });
// const sendSMS = (objectSms) => {
//   const from = 'MovieHub';
//   const to = '+84399595500';
//   const text = `Dat ve thanh cong
//   Ma: ${objectSms.code}`;

//   vonage.message.sendSms(from, to, text, (err, responseData) => {
//     if (err) {
//       console.log(err);
//     } else {
//       if (responseData.messages[0]['status'] === '0') {
//         console.log('Message sent successfully.');
//       } else {
//         console.log(
//           `Message failed with error: ${responseData.messages[0]['error-text']}`
//         );
//       }
//     }
//   });
// };
// module.exports = {sendSMS};
