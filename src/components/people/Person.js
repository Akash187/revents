import React from 'react';
import {Card, Image, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";

const Person = () => {
  return (
    <Link to='/user/123'>
      <Card className='person no-margin'>
        <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' fluid/>
        <Segment basic>
          <h3 className='no-margin person-title'>Laura Huna Laura Huna</h3>
          <h5 className='no-margin person-address'>Kisslemee Florida, United States</h5>
        </Segment>
      </Card>
    </Link>
  );
};

export default Person;
