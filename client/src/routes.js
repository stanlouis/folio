import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home/home';
import Layout from './hoc/layout';
import Login from './containers/Login/login';
import AddPortfolio from './containers/AddPortfolio/add';
import User from './components/Admin/profile';
import Register from './containers/Register/register';
import Logout from './components/Admin/logout';
import Auth from './hoc/auth';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Auth(Home, null)} />
        <Route path="/login" exact component={Auth(Login, false)} />
        <Route path="/user/logout" exact component={Auth(Logout,true)}/>
        <Route path="/user" exact component={Auth(User, true)} />
        <Route path="/user/add" exact component={Auth(AddPortfolio,true)}/>
        <Route path="/user/register" exact component={Auth(Register,false)}/>
      </Switch>
    </Layout>
  );
};

export default Routes;
