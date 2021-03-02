const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
//   host: 'smtp.gmail.com',
// port: 587,
// ignoreTLS: false,
// secure: false,
  auth: {
    user: 'doantotnghiepthang9@gmail.com',
    pass: 'doantotnghiep'
  }
});
let contentMail = (objSender) => {
  return `
    <div style="display:flex;flex-direction: column; border: 2px #CCFFFF solid; border-width: 10px; max-width :700px; font-size: 20px; padding: 10px; color:#000066 ; background-image: url('ticket.jpg');">
    <div style="text-align: center; padding: 10px;">
      <div style="font-weight: bold">
        <p>Mã vé: ${objSender.code}</p>
      </div>
      </p>
    <div style="display: flex;flex-direction: row; width: 100%;">
    <div style="width: 50%">
      <div >
        <p>Phim: ${objSender.film}</p> 
      </div>
      <div >
        <p>Số ghế: ${objSender.seats}</p> 
      </div>
      <div >
        <p>Thời gian: ${objSender.time_start}</p>
      </div>
    </div>
    <div style="width: 50%">
      <div >
        <p>Rạp: ${objSender.theater}</p>
      </div>
      <div >
        <p>Phòng: ${objSender.room}</p>
      </div>
      <div >
        <p>Địa chỉ: ${objSender.address}</p>
      </div>
    </div>
    </div>

    </div>
  </div>
  `;
  // <div style="padding: 10px; background-color: #003375">
  //   <div style="padding: 10px; background-color: white;">
  //       <h4 style="color: #0085ff">Đặt vé thành công</h4>
  //       <span style="color: black, width: 150px">Mã: ${ticket.id}</span><br/>
  //       <span style="color: black, width: 150px">Số ghế:${ticket.count} </span><br/>
  //       <span style="color: black, width: 150px">Ghế:${ticket.seats} </span><br/>
  //       <span style="color: black, width: 150px">Giá:${ticket.cost} </span><br/>
  //       <span style="color: black, width: 150px">Tên khách hàng:${ticket.customers} </span><br/>
  //       <span style="color: black, width: 150px">Số điện thoại:${ticket.phone_number} </span><br/>
  //       <span style="color: black, width: 150px">Loại thanh toán:${ticket.payment} </span><br/>
  //       <span style="color: black, width: 150px">Thời gian bắt đầu:${ticket.time_start} </span><br/>
  //       <span style="color: black, width: 150px">Thời gian hết phim:${ticket.time_end} </span><br/>
  //       <span style="color: black, width: 150px">Tên rạp:${ticket.theater} </span><br/>
  //       <span style="color: black, width: 150px">Tên phòng:${ticket.room} </span><br/>
  //   </div>
  // </div>
};

let contentCode = (code) => {
  return `
    <div style="padding: 10px; background-color: #003375">
      <div style="padding: 10px; background-color: white;">
          <h4 style="color: #0085ff">Mã code change password</h4>
          <span style="color: black; font-weight: bold; font-size: 16px;">${code}</span><br/>
      </div>
    </div> 
  `;
};

module.exports = {
  transporter,
  contentMail,
  contentCode
};
