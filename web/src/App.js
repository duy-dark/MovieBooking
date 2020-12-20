import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from "./router";
import "./styles/styles.scss";
// import CustomScrollbar from './components/CustomScrollbar'
import AppCustomer from './views/customers/AppCustomer'
import LayoutAdmin from './views/admin/LayoutAdmin'
import Login from './views/customers/Login'
class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={AppCustomer} />
        <Route path="/login" component={Login} />
        <Route path="/admin" exact component={LayoutAdmin} />
      </Router>
    );
  }
}

export default App;
