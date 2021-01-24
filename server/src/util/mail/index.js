const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'doantotnghiepthang9@gmail.com',
    pass: 'doantotnghiep'
  }
});
let contentMail = (ticket) => {
  return `
    <div style="padding: 10px; background-color: #003375">  
      <div style="padding: 10px; background-color: white;">
          <h4 style="color: #0085ff">Đặt vé thành công</h4>
          <span style="color: black, width: 150px">Mã: ${ticket.id}</span><br/>
          <span style="color: black, width: 150px">Số ghế:${ticket.count} </span><br/>
          <span style="color: black, width: 150px">Ghế:${ticket.seats} </span><br/>
          <span style="color: black, width: 150px">Giá:${ticket.cost} </span><br/>
          <span style="color: black, width: 150px">Tên khách hàng:${ticket.customers} </span><br/>
          <span style="color: black, width: 150px">Số điện thoại:${ticket.phone_number} </span><br/>
          <span style="color: black, width: 150px">Loại thanh toán:${ticket.payment} </span><br/>
          <span style="color: black, width: 150px">Thời gian bắt đầu:${ticket.time_start} </span><br/>
          <span style="color: black, width: 150px">Thời gian hết phim:${ticket.time_end} </span><br/>
          <span style="color: black, width: 150px">Tên rạp:${ticket.theater} </span><br/>
          <span style="color: black, width: 150px">Tên phòng:${ticket.room} </span><br/>
      </div>
    </div> 
  `;
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
