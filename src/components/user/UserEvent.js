import React from 'react';
import { Card, Image, Segment } from 'semantic-ui-react';
import {Link} from "react-router-dom";
import moment from 'moment';

const UserEvent = ({event}) => {
  return (
    event ? <Link to={`/event/${event.id}`}>
        <Card className='user-event no-margin'>
          <Image fluid src={`/assets/categoryImages/${event.about}.jpg`} style={{'height' : '140px', 'objectFit': 'cover'}}/>
          <Segment basic style={{height: 100}}>
            <h3 className='no-margin user-event-title'>{event.name}</h3>
            <h4 className='no-margin user-event-date'>{moment(event.dateTime.seconds * 1000).format('Do MMM YYYY, h:mmA')}</h4>
          </Segment>
        </Card>
      </Link> : <div/>
  );
};

export default UserEvent;
