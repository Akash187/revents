import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import { Tab } from 'semantic-ui-react'
import UserEventList from "./UserEventList";
import moment from 'moment';

const UserEvents = ({hostEvents, guestEvents}) => {

  let allEvents = [...hostEvents, ...guestEvents];
  let now = moment();
  let pastEvents = allEvents.filter((event) => {
    return moment(event.dateTime.seconds * 1000).isBefore(now);
  });
  let futureEvents = allEvents.filter((event) => {
    return moment(event.dateTime.seconds * 1000).isAfter(now);
  });

  let panes = [
    { menuItem: 'All Events', render: () => <Tab.Pane attached={false} basic><UserEventList allEvents={allEvents}/></Tab.Pane> },
    { menuItem: 'Past Events', render: () => <Tab.Pane attached={false} basic><UserEventList allEvents={pastEvents}/></Tab.Pane> },
    { menuItem: 'Future Events', render: () => <Tab.Pane attached={false} basic><UserEventList allEvents={futureEvents}/></Tab.Pane> },
    { menuItem: 'Host', render: () => <Tab.Pane attached={false} basic><UserEventList allEvents={hostEvents}/></Tab.Pane> }
  ];

  return (
    <Card fluid id="myEvents">
      <Card.Content>
        <div className='user-events-header'>
          <Icon name='calendar alternate' size='big' />
          <h3 className='no-margin'>Events</h3>
        </div>
        <div style={{ marginTop: '1rem' }}>
          <Tab menu={{ secondary: true, pointing: true }} panes={panes}/>
        </div>
      </Card.Content>
    </Card>
  );
};

export default UserEvents;
