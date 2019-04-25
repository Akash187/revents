import React from 'react';
import logo from '../../assets/logo.png';
import { Button, Icon } from 'semantic-ui-react'

const Home = () => {
  return (
    <div className="home">
      <div className="home-header">
        <img src={logo} alt="logo"/>
        <span>Re-vents</span>
      </div>
      <div className="home-intro">Do whatever you want to do</div>
      <Button inverted size='large'>Get Started <Icon name='arrow right'/></Button>
    </div>
  );
};

export default Home;
