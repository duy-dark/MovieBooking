import routes from "./router";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Layout } from 'antd';

import MenuHome from "./views/home/menu/MenuHome";

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
      {/* <div className="app">
        <CustomScrollbar>
        <Switch>{showRouteComponent(routes)}</Switch>
        </CustomScrollbar>
      </div> */}
      
      <Layout>
        <Sider><MenuHome/></Sider>
        <Layout>
          <Switch>{showRouteComponent(routes)}</Switch>
        </Layout>
      </Layout>
    </Router>
  );
}
