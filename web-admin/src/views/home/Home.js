import { Layout } from "antd";
import { VideoCameraFilled } from "@ant-design/icons";
import MenuHome from "./menu/MenuHome";
import HeaderHome from "./header/HeaderHome";

import "./../../styles/home/home.scss";

const { Header, Content, Footer, Sider } = Layout;

function Home(props) {
  return (
    <div className="home">
      <div className="home-left">
        <MenuHome></MenuHome>
      </div>
      <div className="home-right">
        <HeaderHome></HeaderHome>
      </div>
    </div>
  );
}

export default Home;
