import React from "react";
import Home from "./views/home/Home";
import Film from "./views/Film/showAllFilm/Film"
import Detail from "./views/Film/editFilm/DetailPopup"
import NewDetail from "./views/New/NewDetail"
import ListNewPage from "./views/New/ListNewPage"
import AddNewPage from "./views/New/AddNewPage"
import ListTheater from "./views/Theater/ListTheater"
import AddTheater from "./views/Theater/AddTheater"
import AddRoom from "./views/Theater/AddRoom"
import TheaterDetail from "./views/Theater/TheaterDetail"
import DetailRoom from "./views/Theater/DetailRoom"
import ListUser from "./views/User/ListUser"
const routes = [
  {
    path: "/",
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
    path: "/new/list",
    exact: true,
    component: () => <ListNewPage/>
  },
  {
    path: "/new/create",
    exact: true,
    component: () => <AddNewPage/>
  },
  {
    path: "/new/:id",
    exact: true,
    component: () => <NewDetail/>
  },
  {
    path: "/theater/list",
    exact: true,
    component: () => <ListTheater/>
  },
  {
    path: "/theater/create",
    exact: true,
    component: () => <AddTheater/>
  },
  {
    path: "/theater/:id",
    exact: true,
    component: () => <TheaterDetail/>
  },
  {
    path: "/room/create",
    exact: true,
    component: () => <AddRoom/>
  },
  {
    path: "/room/:id",
    exact: true,
    component: () => <DetailRoom/>
  },
  {
    path: "/user/list",
    exact: true,
    component: () => <ListUser/>
  },

];

export default routes;
