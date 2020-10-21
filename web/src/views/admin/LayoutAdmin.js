import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from './router'

class LayoutAdmin extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Switch>
            { this.showRouteComponent(routes) }
          </Switch>
        </div>
      </Router>
    );
  }

  showRouteComponent = (routes) => {
    let result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <Route key={index} path={route.path} exact={route.exact} component={route.component}/>
        );
      });
    }
    return result;
  }
}

export default LayoutAdmin;
