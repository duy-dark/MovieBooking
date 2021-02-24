import React from "react";
import Login from "./views/login/Login";
import Home from "./views/home/Home";

const routes = [
  {
    path: "/login",
    exact: true,
    component: () => <Login />,
  },
  {
    path: "/home",
    exact: true,
    component: () => <Home />,
  },
];

export default routes;
