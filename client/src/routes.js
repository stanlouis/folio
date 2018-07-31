import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home/home';
import Layout from './hoc/layout';
import Login from './containers/Login/login';
import User from './components/Admin/profile'
import Auth from './hoc/auth';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Auth(Home, null)} />
        <Route path="/login" exact component={Auth(Login, false)} />
        <Route path="/user" exact component={Auth(User,true)}/>
      </Switch>
    </Layout>
  );
};

export default Routes;
