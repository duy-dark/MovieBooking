import React from "react";
import routes from "./router";
import { BrowserRouter as Route, Switch } from "react-router-dom";
import Header from "../../components/customer/Header";

export default function AppCustomer(props) {
  let showRouteComponent = (routes) => {
    let result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return <Route key={index} path={route.path} exact={route.exact} component={route.component} />;
      });
    }
    return result;
  };

  // return (
  //   <>
  //     <Header />
  //     <NewsCustomer />
  //     <Switch>{showRouteComponent(routes)}</Switch>
  //   </>
  // );

  return (
    <>
      <Header />
      <Switch>{showRouteComponent(routes)}</Switch>
    </>
  );
}
