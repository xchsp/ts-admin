import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  // Redirect,
} from 'react-router-dom';
import Layout from '../views/layout/Layout';
import Login from '../views/pages/user/Login';
import Register from '../views/pages/user/Register/register';

const Routers = () => (
  <Router>
    <Switch>
      <Route exact path='/login' component={Login} />
      <Route exact path='/register' component={Register} />
      <Route path='/' component={Layout} />
    </Switch>
  </Router>
);

export default Routers;
