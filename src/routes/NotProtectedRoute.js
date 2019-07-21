import React, {Fragment} from 'react';
import { Route, withRouter } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import Navbar from "../components/navbar/Navbar";
import {updatePrevUnProtectedRoute} from "../store/actions/routeActions";
import {connect} from "react-redux";

const NotProtectedRoute = ({component: Component, history, updatePrevUnProtectedRoute, ...rest}) => {

  updatePrevUnProtectedRoute(history.location.pathname);

  return (
    <Route {...rest} render={
      (props) => {
        return (
          <Fragment>
            <Navbar/>
            <Container className='project-content'>
              <Component {...props}/>
            </Container>
          </Fragment>
        )
      }
    }/>
  );
};

const matchDispatchToProps = (dispatch) => {
  return{
    updatePrevUnProtectedRoute : (route) => dispatch(updatePrevUnProtectedRoute(route))
  }
};

export default connect(null, matchDispatchToProps)(withRouter(NotProtectedRoute));
