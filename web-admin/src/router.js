import React from "react";
import Login from "./views/login/Login";
import Home from "./views/home/Home";
import Film from "./views/Film/showAllFilm/Film"
import Detail from "./views/Film/editFilm/DetailPopup"
import NewPaper from "./views/New/NewPaper"
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
  {
    path: "/ManageFilm",
    exact: true,
    component: () => <Film/>,
  },
  {
    path: "/DetailFilm",
    exact: true,
    component: () => <Detail/>,
  },
  {
    path: "/new",
    exact: true,
    component: () => <NewPaper/>
  }
];

export default routes;
