import React from 'react';
import '../../styles/customers/header.scss';
import Navbar from './Navbar';
import logoWeb from '../../assets/web-logo.png'
import avatar from '../../assets/avatar.png'
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
export default function Header(props) {
  // const [ position, setPosition ] = useState(0);

  return (
    <div className="header">
      <div className="header__icon">
        <img src={logoWeb} alt=""/>
      </div>
      <Navbar/>
      <div className="header__info">
        <div className="header__customer">
          <Link to="/login" className="header__login">
            <img src={avatar} alt="avatar"/>
            Đăng nhập
          </Link>
        </div>
        <div className="header__position">
          <Dropdown className="dropdown-position">
            <Dropdown.Toggle id="dropdown-basic">
              Hồ Chí Minh
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  )
}
