import React from 'react'
import Home from './views/customers/Home'
import LayoutAdmin from './views/admin/LayoutAdmin'
import Login from './views/customers/Login'

const routes = [
  {
    path: '/',
    exact: true,
    component: () => <Home />
  },
  {
    path: '/admin',
    exact: false,
    component: () => <LayoutAdmin />
  },
  {
    path: '/login',
    exact: true,
    component: () => <Login />
  }
];

export default routes;

