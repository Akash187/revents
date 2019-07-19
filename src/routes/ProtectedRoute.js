import React, {Fragment} from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import {Container, Dimmer, Loader} from 'semantic-ui-react';
import Navbar from "../components/navbar/Navbar";
import { connect } from 'react-redux';
import { isLoaded } from 'react-redux-firebase';

const ProtectedRoute = ({component: Component,auth, history, ...rest}) => {

  return (
    <Route {...rest} render={
      (props) => {
        if(isLoaded(auth)){
          if(auth.uid){
            return <Fragment>
              <Navbar/>
              <Container className='project-content'>
                <Component {...props}/>
              </Container>
            </Fragment>
          }else{
            return <Redirect to={{
              pathname: '/authenticate',
              state: { path: history.location.pathname }
            }}
            />
          }
        }else{
          return <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
        }
      }
    }/>
  );
};

const mapStateToProps = (state) => {
  return{
    auth: state.firebase.auth
  }
};

export default connect(mapStateToProps)(withRouter(ProtectedRoute));
