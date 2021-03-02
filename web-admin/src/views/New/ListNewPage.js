import React from 'react';
import { Link } from 'react-router-dom'
import { Layout, Menu, Breadcrumb } from "antd";
const { Header, Content, Footer } = Layout;

export default function ListNewPage() {
  return (
    <Layout className="layout">
      <Header style={{ background: "#FFFFFF" }}>
        <Menu theme="light" mode="horizontal" defaultSelectedKeys={["2"]}>
          <Menu.Item key="1"><Link to="/new/list">List New</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/new/create">Add New</Link></Menu.Item>
        </Menu>
      </Header>
      <div> 
        list
      </div>
    </Layout>
  )
}