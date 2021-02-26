import React from "react";
import Login from "./views/login/Login";
import Film from "./views/Film/Film";
const routes = [
  {
    path: "/",
    exact: true,
    component: () => <div />,
  },
  {
    path: "/login",
    exact: true,
    component: () => <Login />,
  },

  {
    path: "/ManageFilm",
    exact: true,
    component: () => <Film />,
  },
];

export default routes;
