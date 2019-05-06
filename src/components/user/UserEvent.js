import React from 'react';
import { Card, Image, Segment } from 'semantic-ui-react';
import {Link} from "react-router-dom";

const UserEvent = () => {
  return (
    <Link to='/event/123'>
      <Card className='user-event no-margin'>
        <Image fluid src='/assets/categoryImages/drinks.jpg'/>
        <Segment basic style={{height: 120}}>
          <h3 className='no-margin user-event-title'>A trip to Empire State</h3>
          <h4 className='no-margin user-event-date'>02 Feb 2019 5:30PM</h4>
        </Segment>
      </Card>
    </Link>
  );
};

export default UserEvent;