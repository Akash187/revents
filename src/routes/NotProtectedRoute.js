import React, {Fragment} from 'react';
import { Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import Navbar from "../components/navbar/Navbar";

const NotProtectedRoute = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={
      (props) => {
        return (
          <Fragment>
            <Navbar/>
            <Container className='content'>
              <Component {...props}/>
            </Container>
          </Fragment>
        )
      }
    }/>
  );
};

export default NotProtectedRoute;
