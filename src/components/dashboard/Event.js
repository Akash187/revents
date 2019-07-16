import React from 'react';
import { Card, Grid, Image, Header, Icon, Button } from 'semantic-ui-react';
import {Link} from "react-router-dom";
import LazyLoad from 'react-lazyload';
import moment from 'moment';

const Event = ({event, users}) => {

  const createdBy = users[event.createdBy];
  const attendeeList = event.attendeeList;

  return (
    <Card fluid>
      <Card.Content>
        <Grid columns={2}>
          <Grid.Column width={3}>
            <LazyLoad>
              <Image src={(createdBy && createdBy.images) ? createdBy.images[0] : '/assets/user.png'} size='small' circular />
            </LazyLoad>
          </Grid.Column>
          <Grid.Column width={13}>
            <Header>{event.name}</Header>
            <Header.Subheader>Hosted by <Link to='/'>{createdBy && createdBy.name}</Link></Header.Subheader>
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
          <LazyLoad>
            {attendeeList.map((attendeeId) => {
              return <Image key={attendeeId} src={(users[attendeeId] && users[attendeeId].images) ? users[attendeeId].images[0] : '/assets/user.png'} circular />
            })}
          </LazyLoad>
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
