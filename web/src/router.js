import React from "react";
import Login from "./views/customers/Login";
import Home from "./views/customers/Home";
// import MovieDetail from "./views/customers/film/Film.js";
import MovieDetail from "./views/customers/FilmDetail.js";
import Booking from "./views/customers/Booking.js";
import New from "./views/customers/New.js"
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
    path: "/:id/detail",
    exact: true,
    component: () => <MovieDetail />,
  },
  {
    path: "/:id/booking",
    exact: true,
    component: () => <Booking />,
  },
  {
    path: "/new",
    exact: true,
    component: () => <New />
  }
];

export default routes;
