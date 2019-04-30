import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

const Home = (props) => {
  return (
    <div className="home">
      <div className="home-header">
        <img src='/assets/logo.png' alt="logo"/>
        <span>Re-vents</span>
      </div>
      <div className="home-intro">Do whatever you want to do</div>
      <Button inverted size='large' onClick={() => {props.history.push('/dashboard')}}>Get Started <Icon name='arrow right'/></Button>
    </div>
  );
};

export default Home;
