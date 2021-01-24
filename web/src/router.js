import React from "react";
import Login from "./views/customers/Login";
import Home from "./views/customers/Home";
// import MovieDetail from "./views/customers/film/Film.js";
import MovieDetail from "./views/customers/FilmDetail.js";

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
  {
    path: "/movie/detail",
    exact: true,
    component: () => <MovieDetail />,
  },
];

export default routes;
