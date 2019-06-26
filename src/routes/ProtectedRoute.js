import React, {Fragment} from 'react';
import { Route, Redirect } from 'react-router-dom';
import {Container, Dimmer, Loader} from 'semantic-ui-react';
import Navbar from "../components/navbar/Navbar";
import { connect } from 'react-redux';
import { isLoaded } from 'react-redux-firebase';

const ProtectedRoute = ({component: Component,auth, ...rest}) => {

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
            return <Redirect to='/authenticate'/>
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

export default connect(mapStateToProps)(ProtectedRoute);
