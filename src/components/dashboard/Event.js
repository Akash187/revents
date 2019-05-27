import React from 'react';
import { Card, Grid, Image, Header, Icon, Button } from 'semantic-ui-react';
import {Link} from "react-router-dom";
import LazyLoad from 'react-lazyload';
import moment from 'moment';

const Event = ({event}) => {
  return (
    <Card fluid>
      <Card.Content>
        <Grid columns={2}>
          <Grid.Column width={3}>
            <LazyLoad>
              <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' size='small' circular />
            </LazyLoad>
          </Grid.Column>
          <Grid.Column width={13}>
            <Header>{event.name}</Header>
            <Header.Subheader>Hosted by <Link to='/'>Clark</Link></Header.Subheader>
          </Grid.Column>
        </Grid>
      </Card.Content>
      <Card.Content>
        <Header as='h4'>
          <span><Icon fitted name='clock outline'/>{' '} {moment(event.dateTime.seconds*1000).format('dddd Do MMMM')} at {moment(event.dateTime.seconds*1000).format('HH:mm')}</span>
          <span> | </span>
          <span><Icon fitted name='map marker alternate'/>{' '} {event.venue}</span>
        </Header>
      </Card.Content>
      <Card.Content className='people-coming-list'>
        <Image.Group size='mini'>
          <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' circular />
          <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' circular />
          <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' circular />
        </Image.Group>
      </Card.Content>
      <Card.Content>
        <Grid columns={2}>
          <Grid.Column width={13}>
            <p>
              {event.detail}
            </p>
          </Grid.Column>
          <Grid.Column width={3} floated='right' verticalAlign='bottom'>
            <Link to={`/event/${event.id}`}>
              <Button color='teal'>View</Button>
            </Link>
          </Grid.Column>
        </Grid>
      </Card.Content>
    </Card>
  );
};

export default Event;
