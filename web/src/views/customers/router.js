import React from "react";
import Home from "./Home";
import MovieDetail from "./movies/MovieDetail";

const routes = [
  {
    path: "/",
    exact: true,
    component: () => <Home />,
  },
  {
    path: "/movie/detail",
    exact: true,
    component: () => <MovieDetail />,
  },
];

export default routes;
