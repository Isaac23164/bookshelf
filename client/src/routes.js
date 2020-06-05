import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home/home';
import BookView from './components/Books'
import Login from './containers/Admin/login'
import User from './components/Admin'
import AddReview from './containers/Admin/add'
import UserPosts from './components/Admin/userPosts'
import EditBook from './containers/Admin/edit';
import Register from './containers/Admin/register';
import Logout from './components/Admin/logout';

import Layout from './hoc/layout'
import Auth from './hoc/auth'

const Routes = () => {
    return (
      <Layout>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/books/:id" exact component={BookView}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/user" exact component={Auth(User, true)}/>
          <Route path="/user/logout" exact component={Auth(Logout, true)}/>
          <Route path="/user/add" exact component={Auth(AddReview, true)}/>
          <Route path="/user/edit-post/:id" exact component={Auth(EditBook, true)}/>
          <Route path="/user/user-reviews" exact component={Auth(UserPosts, true)}/>
          <Route path="/user/register" exact component={Auth(Register, true)}/>
        </Switch>
      </Layout>
      
    );
};

export default Routes;