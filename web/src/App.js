import React, { Component, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from 'react-redux';
import routes from "./router";
import "./styles/styles.scss";
import Header from "./components/customer/Header";
import Footer from "./components/customer/Footer";
import MyLoading from './components/MyLoading'
import { useSelector } from "react-redux"
class App extends Component {
  render() {
    // let [isLoading, setIsLoading] = useState(false)

    // let loading1 = useSelector(state=>state.films.loading)
    // let loading2 = useSelector(state=>state.users.loading)

    let showRouteComponent = (routes) => {
      let result = null;
      if (routes.length > 0) {
        result = routes.map((route, index) => {
          return <Route key={index} path={route.path} exact={route.exact} component={route.component} />;
        });
      }
      return result;
    };

    // useEffect(() => {
    //   setIsLoading(loading1 + loading2 > 0 ? true : false)
    // }, [loading1, loading2])
    return (
      <>
      {/* <MyLoading active={isLoading}/> */}
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
