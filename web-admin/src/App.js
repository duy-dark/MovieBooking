import routes from "./router";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Layout } from "antd";

import "./styles/home-layout/home.scss";
import MenuHome from "./components/home-layout/MenuHome";
import HeaderHome from "./components/home-layout/HeaderHome";
import DirectoryHome from "./components/home-layout/DirectoryHome";
import FooterHome from "./components/home-layout/FooterHome";

const { Header, Footer, Sider, Content } = Layout;
export default function App() {
  function showRouteComponent(routes) {
    let result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.component}
          />
        );
      });
    }
    return result;
  }

  return (
    <Router>
      <Layout>
        <div className="home">
          <div className="home-left">
            <MenuHome></MenuHome>
          </div>
          <div className="home-right">
            <HeaderHome></HeaderHome>
            <div className="content">
              <DirectoryHome></DirectoryHome>
              <Switch>{showRouteComponent(routes)}</Switch>
            </div>
          </div>
        </div>
        <div className=""></div>
      </Layout>
      <FooterHome></FooterHome>
    </Router>
  );
}
