import React, { useState } from "react";
import "../../styles/customers/header.scss";
import Navbar from "./Navbar";
// import Dropdown from "react-bootstrap/Dropdown";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from "../../redux/users/actions";
export default function Header(props) {
  const dispatch = useDispatch();
  const [ position, setPosition ] = useState('Hồ Chí Minh');
  const [ showLogout, setShowLogout ] = useState(false);
  const history = useHistory();
  const changePosition = (value) => {
    setPosition()
  }

  const changePosition = (value) => {

  }

  const onLogout = () => {
    dispatch(signOut(history))
  }

  return (
    <div className="header">
      <div className="header__icon">
        <img src={`/assets/web-logo.png`} alt="" />
      </div>
      <Navbar />
      <div className="header__info">
        <div className="header__customer">
          { user ? (
            <>
              <div className="header__login" onClick={() => setShowLogout(!showLogout)}>
                <img src={`/assets/avatar.png`} alt="avatar"/><span>{user.name}</span>
              </div>
              <div className="hl-dropdown" style={showLogout ? { display: 'block' } : {}}>
                <div className="hl-dropdown__item">
                  <div className="header__logout" onClick={() => onLogout()}>Đăng Xuất</div>
                </div>
              </div>
            </>
            ) : (
          <Link to="/login" className="header__login">
            <img src={`/assets/avatar.png`} alt="avatar" />
            Đăng nhập
          </Link>
        </div>
        <div className="header__position">
          <div className="header__position__name">{position}</div>
          <div className="header__dropdown" style={{ display: 'none'}}>
            <div className="header__dropdown__option" onClick={changePosition('Hà Nội')}>Hà Nội</div>
            <div className="header__dropdown__option" onClick={changePosition('Đà Nẵng')}>Đà Nẵng</div>
            <div className="header__dropdown__option" onClick={changePosition('Nha Trang')}>Nha Trang</div>
            <div className="header__dropdown__option" onClick={changePosition('Hải Phòng')}>Hải Phòng</div>
          </div>
        </div>
      </div>
    </div>
  );
}
