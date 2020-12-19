import React from "react";
import "../../styles/customers/header.scss";
import Navbar from "./Navbar";
import logoWeb from "../../assets/web-logo.png";
import avatar from "../../assets/avatar.png";

export default function Header(props) {
  // const [ position, setPosition ] = useState(0);

  return (
    <div className="header">
      <div className="header__icon">
        <img src={logoWeb} alt="" />
      </div>
      <Navbar />
      <div className="header__info">
        <div className="header__customer">
          <div className="header__login">
            <img src={avatar} alt="avatar" />
            Đăng nhập
          </div>
        </div>
        <div className="header__position">
          <div className="select-position"></div>
        </div>
      </div>
    </div>
  );
}
