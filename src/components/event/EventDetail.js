import React, {useEffect, useState} from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import EventInfo from "./EventInfo";
import AttendeeList from "./AttendeeList";
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import {firestore} from "../../config/fbConfig";
import moment from "moment/moment";
import {updateStoreEventsAndUsers} from "../../store/actions/eventActions";

const EventDetail = ({event, match, uid, profile, attendeeList, updateStoreEventsAndUsers}) => {

  const [host, setHost] = useState({});
  const [eventConcluded, setEventConcluded] = useState(false);
  const [attendees, setAttendees] = useState({});

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

  useEffect(() => {
    if(attendeeList && attendeeList.length > 0) {
      let promises = attendeeList.map(async (userId) => {
        if (!(userId in attendees)) {
          let doc = await firestore.collection("users").doc(userId).get();
          return new Promise((res, rej) => res({id: userId, ...doc.data()}))
        } else {
          return new Promise((res, rej) => res(attendees[userId]))
        }
      });

      Promise.all(promises)
        .then((results) => {
          let users = {};
          results.forEach(result => {
            users[result.id] = result
          });
          setAttendees(users);
        });
    }else{
      setAttendees({});
    }
  }, [attendeeList]);

  useEffect(() => {
    if(event) {
      console.log(event);
      updateStoreEventsAndUsers(event, {[host.id]: host, ...attendees});
    }
  },[event]);

  return (
    <div>
      {(event && event.id === match.params.id) ?
        <Grid>
          <Grid.Column mobile={16} computer={10}>
            <EventInfo eventConcluded={eventConcluded} event={event} host={host}/>
          </Grid.Column>
          <Grid.Column mobile={16} computer={6}>
            <AttendeeList eventConcluded={eventConcluded} host={host} attendeeList={attendeeList} attendees={attendees}/>
          </Grid.Column>
        </Grid>:
        <Loader active/> }
    </div>
  );
};

const mapStateToProps = ({firestore}, ownProps) => {
  const doc = firestore.ordered;
  return{
    id: ownProps.match.params.id,
    event: doc.events ? doc.events[0] : null,
    attendeeList: doc.events ? doc.events[0].attendeeList || [] : []
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateStoreEventsAndUsers : (event, users) => dispatch(updateStoreEventsAndUsers(event, users))
  }
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => [
    {
      collection: 'events',
      doc: props.id
    },
  ])
)(EventDetail);
