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

const { SubMenu } = Menu;

export default function MenuHome(props) {
  const history = useHistory();
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    history.push('/login');
  }
  return (
    <>
      <Menu
        className="menu"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
      >
        <div className="menu__logo">
          <img src={`/assets/web-logo.png`} alt=""/>
        </div>
        <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Phim">
      <Menu.Item key="sub1-1">Danh sách phim   <Link to="/ManageFilm" /></Menu.Item>
          <Menu.Item key="sub1-2">Thể loại</Menu.Item>
          <Menu.Item key="sub1-3"><Link to="/theater/list">Rạp</Link></Menu.Item>
          <Menu.Item key="sub1-4"><Link to="/new/list">New</Link></Menu.Item>
        </SubMenu>
      
         
        <SubMenu key="sub2" icon={<SettingOutlined />} title="Người dùng">
          <SubMenu key="sub2-1" title="Quản trị viên">
            <Menu.Item key="5">Danh sách</Menu.Item>
            <Menu.Item key="6">Danh sách bị cấm</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2-2" title="Khách Hàng">
            <Menu.Item key="7">Danh sách</Menu.Item>
            <Menu.Item key="8">Danh sách bị cấm</Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu key="sub3" icon={<SettingOutlined />} title="Thống Kê">
        <Menu.Item key="9">Thống Kê<Link to='/thongke'></Link></Menu.Item>
        </SubMenu>
        <Menu.Item key="10" icon={<LoginOutlined />} title="Đăng Xuất">
          <button onClick={logout} style={{border: 'none', background: 'transparent'}}>Đăng Xuất</button>
        </Menu.Item>
      </Menu>
    </>
  );
}
