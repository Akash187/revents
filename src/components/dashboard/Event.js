import React, {useEffect, useState} from 'react';
import { Card, Grid, Image, Header, Icon, Button, Label } from 'semantic-ui-react';
import {Link} from "react-router-dom";
import LazyLoad from 'react-lazyload';
import moment from 'moment';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

const Event = ({event, users, uid, history}) => {

  const createdBy = users[event.createdBy];
  const attendeeList = event.attendeeList;

  const [eventConcluded, setEventConcluded] = useState(false);

  useEffect(() => {
    if(event){
      let now = moment();
      setEventConcluded(moment(event.dateTime.seconds * 1000).isBefore(now));
    }
  },[event]);


  return (
    <Card fluid style={{marginBottom: '2rem !important'}}>
      <Card.Content>
        {(event.active) ? (eventConcluded) &&  <Label as='a' color='teal' ribbon='right'>
          Event Concluded
        </Label> : <Label as='a' color='orange' ribbon='right'>
          Event Cancelled
        </Label>}
        <Grid columns={2}>
          <Grid.Column width={3}>
            <LazyLoad>
              <Image src={(createdBy && createdBy.images) ? createdBy.images[0] : '/assets/user.png'} size='small' circular />
            </LazyLoad>
          </Grid.Column>
          <Grid.Column width={13}>
            <Header>{event.name}</Header>
            <Header.Subheader>Hosted by <Link to={`/user/${createdBy.id}`}>
              <span>
                {createdBy && createdBy.name}
              </span>
              </Link></Header.Subheader>
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

const mapStateToProps = ({firebase: {auth}}) => {
  return{
    uid: auth.uid
  }
};

export default connect(mapStateToProps)(withRouter(Event));
