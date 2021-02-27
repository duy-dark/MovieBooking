import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from 'react-redux';
import routes from "./router";
import "./styles/styles.scss";
import Header from "./components/customer/Header";
import Footer from "./components/customer/Footer";
// import CustomScrollbar from './components/CustomScrollbar'
// import MyLoading from './components/MyLoading'
class App extends Component {
  render() {
  let showRouteComponent = (routes) => {
    let result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return <Route key={index} path={route.path} exact={route.exact} component={route.component} />;
      });
    }
    return result;
  };
  return (
    <>
    {/* <MyLoading active={true}/> */}
    <Router>
      {this.props.header && <Header/>}
      <Switch>
        { showRouteComponent(routes) }
      </Switch>
      {this.props.footer && <Footer/>}
    </Router>
    </>
  )
  }
}

const mapStateToProps = state => {
  return {
  header: !!state.users.header,
  footer: !!state.users.footer
}};
export default connect(mapStateToProps)(App);
