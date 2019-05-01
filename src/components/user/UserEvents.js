import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import { Tab } from 'semantic-ui-react'
import UserEventList from "./UserEventList";

const panes = [
  { menuItem: 'All Events', render: () => <Tab.Pane attached={false} basic><UserEventList/></Tab.Pane> },
  { menuItem: 'Past Events', render: () => <Tab.Pane attached={false} basic><UserEventList/></Tab.Pane> },
  { menuItem: 'Future Events', render: () => <Tab.Pane attached={false} basic><UserEventList/></Tab.Pane> },
  { menuItem: 'Host', render: () => <Tab.Pane attached={false} basic><UserEventList/></Tab.Pane> }
];

const UserEvents = () => {
  return (
    <Card fluid>
      <Card.Content>
        <div className='user-events-header'>
          <Icon name='calendar alternate' size='big' />
          <h3 className='no-margin'>Photos</h3>
        </div>
        <div style={{ marginTop: '1rem' }}>
          <Tab menu={{ secondary: true, pointing: true }} panes={panes} onTabChange={(e, data) => console.log(data)}/>
        </div>
      </Card.Content>
    </Card>
  );
};

export default UserEvents;
