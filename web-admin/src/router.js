import React from "react";
import Login from "./views/login/Login";

const routes = [
  {
    path: "/login",
    exact: true,
    component: () => <Login />,
  },
];

export default routes;
