import React from 'react'
import AppCustomer from './views/customers/AppCustomer'
import LayoutAdmin from './views/admin/LayoutAdmin'
import Login from './views/customers/Login'

const routes = [
  {
    path: '/',
    exact: true,
    component: () => <AppCustomer />
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

