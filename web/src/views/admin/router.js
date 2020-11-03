import React from 'react'
import Dashboard from './Dashboard'
import Login from './Login'

const routes = [
  {
    path: '/admin',
    exact: true,
    component: () => <Dashboard />
  },
  {
    path: '/admin/login',
    exact: true,
    component: () => <Login />
  }
];

export default routes;

