import React from 'react';
import Person from "./Person";
import {Card} from "semantic-ui-react";

const Followers = () => {
  return (
    <Card fluid style={{marginBottom: '2rem'}}>
      <Card.Content>
        <Card.Header>Followers</Card.Header>
      </Card.Content>
      <Card.Content className='followers-list'>
        <Person/>
        <Person/>
        <Person/>
        <Person/>
        <Person/>
        <Person/>
        <Person/>
        <Person/>
      </Card.Content>
    </Card>
  );
};

export default Followers;
