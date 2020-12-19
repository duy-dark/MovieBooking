import React from "react";
import "../../styles/customers/login/login.scss";
import logo from "../../assets/group@2x.png";
export default function Login(props) {
  return (
    <div className="login">
      <div className="login-background">
        <div className="login-form">
          <div className="login-form__logo">
            <img src={logo} alt="" />
          </div>
          <div className="login-form__groups">
            <p className="login-form__groups__title">Đăng nhập để được nhiều ưu đãi, mua vé và bảo mật thông tin!</p>
            <div className="groups-btn">
              <a href="https://www.facebook.com/" className="btn btn-facebook">
                Login with Facebook
              </a>
              <a href="https://www.facebook.com/" className="btn btn-zalo">
                Login with Zalo
              </a>
              <a href="https://www.facebook.com/" className="btn btn-google">
                Login with Google
              </a>
            </div>
          </div>
        </div>
        <div className="login-animation"></div>
      </div>
    </div>
  );
}
