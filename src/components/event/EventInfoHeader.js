import React, {useState} from 'react';
import { Card, Header, Button } from 'semantic-ui-react';
import moment from 'moment';
import { connect } from 'react-redux';
import {joinEvent, leaveEvent} from "../../store/actions/eventActions";

const EventInfoHeader = ({id, name, about, dateTime, uid, host, attendeeList, joinEvent, leaveEvent}) => {

  return (
    <Card fluid>
      <div className='eventInfo-head' style ={ { backgroundImage: `url('/assets/categoryImages/${about}.jpg')`} }>
        <Header
          inverted
          as = 'h1'
          content={name}
          subheader= {moment(dateTime*1000).format('dddd Do MMMM')}/>
        <Header.Subheader
          content={`Hosted by ${host.name}`}
        />
      </div>
      <Card.Content>
        {
          (uid === host.id) ? <Button primary>Edit Event</Button> :
            !(attendeeList.includes(uid)) ? <Button color='teal' onClick={() => joinEvent(id)}>Join The Event</Button> :
            <Button color='red' onClick={() => leaveEvent(id)}>Cancel My Place</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(EventInfoHeader);
