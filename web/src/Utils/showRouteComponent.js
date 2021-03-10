import React from "react";
import { Route } from "react-router-dom";

export default function showRouteComponent(routes) {
  let result = null;
  if (routes.length > 0) {
    result = routes.map((route, index) => {
      return <Route key={index} path={route.path} exact={route.exact} component={route.component} />;
    });
  }
  return result;
}
