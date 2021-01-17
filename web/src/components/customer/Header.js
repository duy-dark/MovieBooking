import React from "react";
import "../../styles/customers/header.scss";
import Navbar from "./Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
export default function Header(props) {
  // const [ position, setPosition ] = useState(0);

  return (
    <div className="header">
      <div className="header__icon">
        <img src={`/assets/web-logo.png`} alt="" />
      </div>
      <Navbar />
      <div className="header__info">
        <div className="header__customer">
          <Link to="/login" className="header__login">
            <img src={`/assets/avatar.png`} alt="avatar" />
            Đăng nhập
          </Link>
        </div>
        <div className="header__position">
          <div className="header__position__name">Hồ Chí Minh</div>
          <div className="header__dropdown" style={{ display: 'none'}}>
            <div className="header__dropdown__option">Hà Nội</div>
            <div className="header__dropdown__option">Hà Nội</div>
            <div className="header__dropdown__option">Hà Nội</div>
            <div className="header__dropdown__option">Hà Nội</div>
            <div className="header__dropdown__option">Hà Nội</div>
            <div className="header__dropdown__option">Hà Nội</div>
            <div className="header__dropdown__option">Hà Nội</div>
            <div className="header__dropdown__option">Hà Nội</div>
          </div>
        </div>
      </div>
    </div>
  );
}
