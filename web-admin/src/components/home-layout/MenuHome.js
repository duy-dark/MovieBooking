import React from "react";
import "antd/dist/antd.css";
import "../../styles/home-layout/home.scss";

import { Menu, Switch, Divider } from "antd";
import { Link } from "react-router-dom";
import {
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  SettingOutlined,
  LinkOutlined,
  VideoCameraFilled,
} from "@ant-design/icons";

const { SubMenu } = Menu;

export default function MenuHome(props) {
  const [mode, setMode] = React.useState("inline");
  const [theme, setTheme] = React.useState("light");

  const changeMode = (value) => {
    setMode(value ? "vertical" : "inline");
  };

  const changeTheme = (value) => {
    setTheme(value ? "dark" : "light");
  };

  return (
    <>
      <Menu
        className="home-left"
        style={{ width: 256 }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode={mode}
        theme={theme}
      >
        <VideoCameraFilled
          style={{ fontSize: "100px", color: "#db3434", marginLeft: "0px" }}
        />
        <div>
          {" "}
          <Switch onChange={changeMode} /> Change Mode
          <Divider type="vertical" />
          <Switch onChange={changeTheme} /> Dark
        </div>

        <br />
        <br />

        <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Phim">
          <Menu.Item key="sub1-1">
            Danh sách phim <Link to="/ManageFilm" />
          </Menu.Item>
          <Menu.Item key="sub1-2">Thể loại</Menu.Item>
          <Menu.Item key="sub1-3">Rạp</Menu.Item>
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
          <Menu.Item key="9">Thống Kê</Menu.Item>
        </SubMenu>
        <Menu.Item key="link" icon={<LinkOutlined />}>
          <a
            href="https://ant.design"
            target="_blank"
            rel="noopener noreferrer"
          >
            Thông tin cá nhân
          </a>
        </Menu.Item>
      </Menu>
    </>
  );
}
