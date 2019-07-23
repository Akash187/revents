import React from 'react';
import { Card, Header, Button } from 'semantic-ui-react';
import moment from 'moment';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import {joinEvent, leaveEvent} from "../../store/actions/eventActions";

const EventInfoHeader = ({event, uid, host, attendeeList, joinEvent, leaveEvent, history, eventConcluded}) => {

  return (
    <Card fluid>
      <div className='eventInfo-head' style ={ { backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), ${`url('/assets/categoryImages/${event.about}.jpg')`}`}}>
        <Header
          inverted
          as = 'h1'
          content={event.name}
          subheader= {moment(event.dateTime.toDate()).format('dddd Do MMMM')}/>
        <Header.Subheader
          content={`Hosted by ${host.name}`}
        />
      </div>
      <Card.Content>
        {
          !(event.active) ? <Button disabled color='red'>Event Cancelled</Button> :
          (eventConcluded) ? <Button disabled color="teal">Event Concluded</Button> :
          !(uid) ?
            <Button primary onClick={() => history.push('/authenticate')}>
              Login To Join Event
            </Button> :
          (uid === host.id) ?
            <Button color={'orange'} onClick={() => history.push(`/editEvent/${event.id}`)}>
              Manage Event
            </Button> :
            !(attendeeList.includes(uid)) ?
              <Button color='teal' onClick={() => {
                joinEvent(event.id);
              }}>
                Join The Event
              </Button> :
            <Button color='red' onClick={() => {
              leaveEvent(event.id);
            }}>
              Cancel My Place
            </Button>
        }
      </Card.Content>
    </Card>
  );
};

const mapStateToProps = ({firebase, form}) => {
  return{
    uid: firebase.auth.uid,
    submitting: form.submitting
  }
};

const mapDispatchToProps = (dispatch) => {
  return{
    joinEvent: (userId) => dispatch(joinEvent(userId)),
    leaveEvent: (userId) => dispatch(leaveEvent(userId))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EventInfoHeader));
