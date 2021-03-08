import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from 'react-redux';
import routes from "./router";
import "./styles/styles.scss";
import Header from "./components/customer/Header";
import Footer from "./components/customer/Footer";
import MyLoading from './components/MyLoading'
import NotFound from "./views/NotFound";
import { useSelector, useDispatch } from 'react-redux';
import {  getUserInfo } from "./redux/users/actions";
class App extends Component {
  constructor(props){
    super(props)
    this.props.getUser()
  }
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
      <MyLoading active={this.props.isLoading}/>
      <Router>
        {this.props.header && <Header/>}
        <Switch>
          { showRouteComponent(routes) }
          <Route component={NotFound} />
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
  footer: !!state.users.footer,
  isLoading: state.users.loading + state.films.loading > 0 ? true : false
}};

const mapDispatchToProps=(dispatch)=>({
  getUser:()=>{
    const token = localStorage.getItem("token");
    const userID = localStorage.getItem("userID");
    
    if (token && userID) {
      dispatch(getUserInfo({ token, userID }));
    }
  }
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
