import React from "react";
import "antd/dist/antd.css";
import "./../../../styles/home/home.scss";
import { Menu, Switch, Divider } from "antd";
import { Link } from 'react-router-dom'
import {
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  SettingOutlined,
  LinkOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux"
import {signOut} from "../../../redux/users/actions"

const { SubMenu } = Menu;

export default function MenuHome(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(signOut(history))
  }
  const goHome = () => {
    history.push('/')
  }
  return (
    <>
      <Menu
        className="menu"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1", "sub2"]}
        mode="inline"
      >
        <div className="menu__logo">
          <img style={{cursor: "pointer"}} src={`/assets/web-logo.png`} onClick={goHome} alt=""/>
        </div>
        <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Phim">
          <Menu.Item key="sub1-1">Danh sách phim   <Link to="/ManageFilm" /></Menu.Item>
          <Menu.Item key="sub1-2"><Link to="/theater/list">Rạp</Link></Menu.Item>
          <Menu.Item key="sub1-3"><Link to="/new/list">New</Link></Menu.Item>
        </SubMenu>
      
        <SubMenu key="sub2" icon={<SettingOutlined />} title="Người dùng">
          <Menu.Item key="sub2-2"><Link to="/user/list">Danh sách User</Link></Menu.Item>
        </SubMenu>
        <Menu.Item key="10" icon={<LoginOutlined />} title="Đăng Xuất">
          <button onClick={logout} style={{border: 'none', background: 'transparent'}}>Đăng Xuất</button>
        </Menu.Item>
      </Menu>
    </>
  );
}
