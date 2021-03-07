import routes from "./router";
import React,{ Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout } from 'antd';
import { connect } from 'react-redux';
import MenuHome from "./views/home/menu/MenuHome";
import Login from "./views/login/Login"
import "./styles/styles.scss"

const { Sider } = Layout; 
class App extends Component {
  render(){
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
        <Sider className="left-sidebar"><MenuHome/></Sider>
     
        <Layout>
          <Switch>{showRouteComponent(routes)}</Switch>
        </Layout>
      </Layout>
    </Router>
  );}
}
const mapStateToProps = state => {
  return {
  header: !!state.users.header,
  footer: !!state.users.footer
}};
export default connect(mapStateToProps)(App);
