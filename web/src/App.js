import React from "react";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import routes from "./router";
import "./styles/styles.scss";
import Header from "./components/customer/Header";
import Footer from "./components/customer/Footer";
// import CustomScrollbar from './components/CustomScrollbar'
function App() {
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
      <Header/>
      <Switch>
        { showRouteComponent(routes) }
      </Switch>
      {/* <Footer/> */}
    </>
  )
}

export default App;
