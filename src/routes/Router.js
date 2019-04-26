import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Home from "../components/home/Home";
import Dashboard from "../components/dashboard/Dashboard";
import NotProtectedRoute from "./NotProtectedRoute";

const Router = () => {
  return(
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path='/' component={ Home }/>
          <NotProtectedRoute exact path='/dashboard' component={ Dashboard} />
          <Route path="*" render = {() => <Redirect to="/" />}/>
        </Switch>
      </div>
    </BrowserRouter>
  )
};

export default Router;