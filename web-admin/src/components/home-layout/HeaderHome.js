import { Layout, Menu, Breadcrumb } from "antd";

const { Header, Content, Footer } = Layout;

function HeaderHome(props) {
  return (
    <Header style={{ background: "#FFFFFF", height: "82px" }}>
      <Menu theme="light" mode="horizontal" defaultSelectedKeys={["2"]}>
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
      </Menu>
    </Header>
  );
}

export default HeaderHome;
