import React from "react";
import Login from "./views/customers/Login";
import Home from "./views/customers/Home";

const routes = [
  {
    path: "/",
    exact: true,
    component: () => <Home />,
  },
  {
    path: "/login",
    exact: true,
    component: () => <Login />,
  },
];

export default routes;
