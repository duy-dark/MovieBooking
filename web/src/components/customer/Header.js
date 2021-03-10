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

  const user = useSelector(state => state.users.user);

  const goHome = () => {
    history.push('/')
  }

  const onLogout = () => {
    dispatch(signOut(history))
  }

  const goProfile=()=>{
    history.push('/profile')
  }

  const showNavbar = () => {
    let element = document.getElementById('burger')
    let body = document.getElementsByTagName('body')[0]
    let navbar = document.getElementsByClassName('header__info')[0]
    if (document.getElementsByClassName("header__toggle").length > 0) {
      element.classList.remove('header__toggle')
      navbar.classList.remove('nav-active')
      body.style.overflow = 'auto'
    } else {
      body.style.overflow = 'hidden'
      navbar.classList.add('nav-active')
      element.classList.add('header__toggle')
    }
  }


  return (
    <div className="header">
      <div className="header__icon">
        <img onClick={goHome} src={`/assets/web-logo.png`} alt="" />
      </div>
      <Navbar />
      <div className="header__info">
        <div className="header__info__content">
          <div className="header__customer">
            { user ? (
              <>
                <div className="header__login" onClick={() => setShowLogout(!showLogout)}>
                  <img src={`${user.avatar ? user.avatar : '/assets/avatar.png'}`} alt="avatar"/><span>{user.name}</span>
                </div>
                <div className="hl-dropdown" style={showLogout ? { display: 'block' } : {}}>
                    <div className="hl-dropdown__item">
                      <button type="button" className="btn btn-light">
                    <div className="header__profile" onClick={() => goProfile()}>Hồ sơ</div>
                    </button>
                    <button type="button" className="btn btn-light">
                    <div className="header__logout" onClick={() => onLogout()}>Đăng Xuất</div>
                      </button>
                    </div>
                </div>
              </>
              ) : (
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
      <div id="burger" className="header__burger" onClick={showNavbar}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </div>
  );
}
