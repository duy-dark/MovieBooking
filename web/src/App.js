import React, { Component } from 'react';
import routes from './router';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles/styles.scss';
// import CustomScrollbar from './components/CustomScrollbar'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          {/* <CustomScrollbar> */}
            <Switch>
              { this.showRouteComponent(routes) }
            </Switch>
          {/* </CustomScrollbar> */}
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

export default App;
