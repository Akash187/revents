import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Home from "../components/home/Home";
import Dashboard from "../components/dashboard/Dashboard";
import NotProtectedRoute from "./NotProtectedRoute";
import EventDetail from "../components/event/EventDetail";
import User from "../components/user/User";
import ProtectedRoute from "./ProtectedRoute";
import People from "../components/people/People";
import CreateEvent from "../components/event/CreateEvent";
import Settings from "../components/settings/Settings";
import BasicSetting from "../components/settings/BasicSetting";
import AboutMeSetting from "../components/settings/AboutMeSetting";
import PhotosSetting from "../components/settings/PhotosSetting";

const Router = () => {
  return(
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path='/' component={ Home }/>
          <NotProtectedRoute exact path='/dashboard' component={ Dashboard} />
          <NotProtectedRoute exact path='/event/:id' component={ EventDetail} />
          <ProtectedRoute exact path='/user/:id' component={ User } />
          <ProtectedRoute exact path='/people/:id' component={ People } />
          <ProtectedRoute exact path='/createEvent' component={ CreateEvent } />
          <ProtectedRoute path='/settings' component={ Settings } />
          {/*<ProtectedRoute path='/settings/basic' component={ BasicSetting } />*/}
          {/*<ProtectedRoute path='/settings/aboutme' component={ AboutMeSetting } />*/}
          {/*<ProtectedRoute path='/settings/photos' component={ PhotosSetting } />*/}

          <Route path="*" render = {() => <Redirect to="/" />}/>
        </Switch>
      </div>
    </BrowserRouter>
  )
};

export default Router;