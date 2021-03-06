const nodemailer = require('nodemailer');
const {google} = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const ClientID =
  '420984700024-mtmtndn31tamjca6g6tuqriveu3afrng.apps.googleusercontent.com';
const ClientSecret = 'eGrOYDc1H15f_UQflVq1RRhP';
const RedirectURL = 'https://developers.google.com/oauthplayground';
const refresh_token =
  '1//04IEUXpfe5SYPCgYIARAAGAQSNwF-L9IrQrEix6Rejs7AWnoft7Fg0q_QqAlut-MpuNXBbUX2cMKtVFSBBpr_pkN9lEdkn00RId8';

const oauth2Client = new OAuth2(
  ClientID, // ClientID
  ClientSecret, // Client Secret
  RedirectURL // Redirect URL
);

oauth2Client.setCredentials({
  refresh_token: refresh_token
});

const accessToken = oauth2Client.getAccessToken();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  //   host: 'smtp.gmail.com',
  // port: 587,
  // ignoreTLS: false,
  // secure: false,
  auth: {
    type: 'OAuth2',
    user: 'doantotnghiepthang9@gmail.com',
    pass: 'doantotnghiep',
    clientId: ClientID,
    clientSecret: ClientSecret,
    refreshToken: refresh_token,
    accessToken: accessToken
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
