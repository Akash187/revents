import React from 'react';
import {Card, Image, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";

const Person = ({user}) => {
  return (
    (user) ?
    <Link to={`/user/${user.id}`}>
      <Card className='person no-margin'>
        <Image src={user.images ? user.images[0] : '/assets/user.png'} fluid/>
        <Segment basic>
          <h3 className='no-margin person-title'>{user.name}</h3>
          <h5 className='no-margin person-address'>{user.address || 'Address not provided'}</h5>
        </Segment>
      </Card>
    </Link> : <div/>
  );
};

export default Person;
