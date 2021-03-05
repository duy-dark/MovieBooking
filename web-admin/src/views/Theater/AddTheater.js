import React from 'react';
import { Link } from 'react-router-dom'
import { Layout, Menu, Breadcrumb } from "antd";

const { Header } = Layout;


export default function AddTheater() {
  return (
    <Layout className="layout">
      <Header style={{ background: "#FFFFFF" }}>
        <Menu theme="light" mode="horizontal" defaultSelectedKeys={["2"]}>
          <Menu.Item key="1"><Link to="/theater/list">List Theater</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/theater/create">Add Theater</Link></Menu.Item>
          <Menu.Item key="3"><Link to="/room/create">Add Room</Link></Menu.Item>
        </Menu>
      </Header>
      <div className="create-new">
        add theater
      </div>
    </Layout>
  )
}