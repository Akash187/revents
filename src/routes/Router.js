import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Home from "../components/home/Home";
import Dashboard from "../components/dashboard/Dashboard";
import NotProtectedRoute from "./NotProtectedRoute";
import EventDetail from "../components/event/EventDetail";
import User from "../components/user/User";
import ProtectedRoute from "./ProtectedRoute";

const Router = () => {
  return(
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path='/' component={ Home }/>
          <NotProtectedRoute exact path='/dashboard' component={ Dashboard} />
          <NotProtectedRoute exact path='/event/:id' component={ EventDetail} />
          <ProtectedRoute exact path='/user/:id' component={ User } />
          <Route path="*" render = {() => <Redirect to="/" />}/>
        </Switch>
      </div>
    </BrowserRouter>
  )
};

export default Router;