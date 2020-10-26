import React from 'react';
import Home from './Home'

const routes = [
  {
    path: '/',
    exact: true,
    component: () => <Home />
  }
];

export default routes;
