import React, {useEffect, useState} from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import EventInfo from "./EventInfo";
import AttendeeList from "./AttendeeList";
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import {firestore} from "../../config/fbConfig";

const EventDetail = ({event}) => {

  const [host, setHost] = useState({});

  useEffect(() => {
    if(event){
      firestore.collection("users").doc(event.createdBy).get()
        .then((doc) => setHost({id: event.createdBy, ...doc.data()}))
        .catch((err) => console.log(err))
    }
  }, [event]);

  return (
    <div>
      {event ?
        <Grid>
          <Grid.Column mobile={16} computer={10}>
            <EventInfo event={event} host={host}/>
          </Grid.Column>
          <Grid.Column mobile={16} computer={6}>
            <AttendeeList host={host} attendeeList={event.attendeeList ? event.attendeeList : []}/>
          </Grid.Column>
        </Grid>:
        <Loader active/> }
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const doc = state.firestore.ordered;
  return{
    id: ownProps.match.params.id,
    event: doc.events ? doc.events[0] : null
  }
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => [
    {
      collection: 'events',
      doc: props.id
    },
  ])
)(EventDetail);
