import React, {Fragment} from 'react';
import { Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import Navbar from "../components/navbar/Navbar";

const ProtectedRoute = ({component: Component, ...rest}) => {
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

export default ProtectedRoute;
