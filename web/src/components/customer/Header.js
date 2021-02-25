import React, { useState } from "react";
import "../../styles/customers/header.scss";
import Navbar from "./Navbar";
// import Dropdown from "react-bootstrap/Dropdown";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';

export default function Header(props) {
  const [ position, setPosition ] = useState('Hồ Chí Minh');
  const history = useHistory();
  const changePosition = (value) => {
    setPosition()
  }

  const user = useSelector(state => state.users.user);

  const goHome = () => {
    history.push('/')
  }

  return (
    <div className="header">
      <div className="header__icon">
        <img onClick={goHome} src={`/assets/web-logo.png`} alt="" />
      </div>
      <Navbar />
      <div className="header__info">
        <div className="header__customer">
          { user ? (<div className="header__login"><img src={`/assets/avatar.png`} alt="avatar"/><span>{user.name}</span></div>) : (
          <Link to="/login" className="header__login">
            <img src={`/assets/avatar.png`} alt="avatar"/>
            Đăng nhập
          </Link>)}
        </div>
        <div className="header__position">
          <div className="header__position__name">{position}</div>
          <div className="header__dropdown" style={{ display: 'none'}}>
            <div className="header__dropdown__option" onClick={() => changePosition('Hà Nội')}>Hà Nội</div>
            <div className="header__dropdown__option" onClick={() => changePosition('Đà Nẵng')}>Đà Nẵng</div>
            <div className="header__dropdown__option" onClick={() => changePosition('Nha Trang')}>Nha Trang</div>
            <div className="header__dropdown__option" onClick={() => changePosition('Hải Phòng')}>Hải Phòng</div>
          </div>
        </div>
      </div>
    </div>
  );
}
