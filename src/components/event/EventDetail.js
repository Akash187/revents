import React, {useEffect, useState} from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import EventInfo from "./EventInfo";
import AttendeeList from "./AttendeeList";
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import {firestore} from "../../config/fbConfig";
import moment from "moment/moment";

const EventDetail = ({event, match}) => {

  const [host, setHost] = useState({});
  const [eventConcluded, setEventConcluded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  },[]);

  useEffect(() => {
    if(event){
      let now = moment();
      setEventConcluded(moment(event.dateTime.seconds * 1000).isBefore(now));
    }
  },[event]);

  useEffect(() => {
    if(event){
      firestore.collection("users").doc(event.createdBy).get()
        .then((doc) => setHost({id: event.createdBy, ...doc.data()}))
        .catch((err) => console.log(err))
    }
  }, [event]);

  return (
    <div>
      {(event && event.id === match.params.id) ?
        <Grid>
          <Grid.Column mobile={16} computer={10}>
            <EventInfo eventConcluded={eventConcluded} event={event} host={host}/>
          </Grid.Column>
          <Grid.Column mobile={16} computer={6}>
            <AttendeeList eventConcluded={eventConcluded} host={host} attendeeList={event.attendeeList ? event.attendeeList : []}/>
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
