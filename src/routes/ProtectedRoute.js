import React, {Fragment} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import Navbar from "../components/navbar/Navbar";

const ProtectedRoute = ({component: Component, ...rest}) => {

  const secret = localStorage.getItem("secret");
  console.log(secret);

  return (
    <Route {...rest} render={
      (props) => {
        return (
           (secret === "123") ? <Fragment>
            <Navbar/>
            <Container className='project-content'>
              <Component {...props}/>
            </Container>
          </Fragment> : <Redirect to='/dashboard'/>
        )
      }
    }/>
  );
};

export default ProtectedRoute;
