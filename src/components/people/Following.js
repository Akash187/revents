import React from 'react';
import Person from "./Person";
import {Card} from "semantic-ui-react";

const Following = () => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>Following</Card.Header>
      </Card.Content>
      <Card.Content className='following-list'>
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

export default Following;
