import React from 'react';
import { Card, Grid, Image, Header, Icon, Button } from 'semantic-ui-react';
import {Link} from "react-router-dom";
import LazyLoad from 'react-lazyload';

const Event = () => {
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
            <Header>My Demo Event</Header>
            <Header.Subheader>Hosted by <Link to='/'>Clark</Link></Header.Subheader>
          </Grid.Column>
        </Grid>
      </Card.Content>
      <Card.Content>
        <Header as='h4'>
          <span><Icon fitted name='clock outline'/>{' '} Saturday 28th April at 09:30</span>
          <span> | </span>
          <span><Icon fitted name='map marker alternate'/>{' '} The Wolseley, Piccadilly, London, UK</span>
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
              react-redux-toastr is a React toastr message implemented with Redux, primary consists of three things: a reducer, toastr emitter and a React component. The reducer listens to dispatched actions from the component to maintain the toastr state in Redux.
            </p>
          </Grid.Column>
          <Grid.Column width={3} floated='right' verticalAlign='bottom'>
            <Button color='teal'>View</Button>
          </Grid.Column>
        </Grid>
      </Card.Content>
    </Card>
  );
};

export default Event;
