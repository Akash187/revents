import React, {useState, useEffect} from 'react';
import { Grid } from 'semantic-ui-react';
import Events from "./Events";
import Notification from "./Notification";
import {Loader, Dimmer} from 'semantic-ui-react';
import {firestore} from "../../config/fbConfig";
import {connect} from 'react-redux';
import {storeEventsAndUsers} from "../../store/actions/eventActions";

const Dashboard = ({events, users, haveMoreEvent, lastDocSnapshot, storeEventsAndUsers}) => {

  //Variable "Fetching" help prevent running of fetchMoreEvents function more than once.
  const [fetching, setFetching] = useState(false);
  const itemsPerPage = 5;

  useEffect(() => {
    if(events && events.length === 0){
      fetchMoreEvents();
    }
  },[]);

  const fetchMoreEvents = async () => {
    if(!fetching){
      setFetching(true);
      console.log("fetchingMoreEvents");
      let query;
      if(events && events.length === 0){
        query = firestore.collection('events').orderBy("createdAt", "desc").limit(itemsPerPage);
      }else {
        query = firestore.collection('events').orderBy("createdAt", "desc").startAfter(lastDocSnapshot).limit(itemsPerPage);
      }
      const snapshot = await query.get();
      let lastVisible = snapshot.docs[snapshot.docs.length-1];
      if(!lastVisible || snapshot.size < 5){
        haveMoreEvent = false;
      }
      lastDocSnapshot = lastVisible;
      const items = snapshot.docs.map((doc, index) => {
        console.log("Document Name : ", doc.data().name);
        return {id: snapshot.docs[index].id, ...doc.data()}
      });
      events = [...events, ...items];
      storeEventsAndUsers(events, [], haveMoreEvent, lastDocSnapshot);
      setFetching(false);
    }
  };

  useEffect(() => {
    console.log("events",events);
  },[events]);

  return (
    <div>
      {(events && events.length > 0) ? <Grid>
        <Grid.Column mobile={16} computer={10}>
          <Events events={events} fetchMoreEvents={fetchMoreEvents} haveMoreData={haveMoreEvent}/>
        </Grid.Column>
        <Grid.Column mobile={16} computer={6}>
          <Notification/>
        </Grid.Column>
      </Grid> : <Dimmer active inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>}
    </div>
  );
};

const mapStateToProps = ({event: {events, users, haveMoreEvent, lastDocSnapshot}}) => {
  return{
    events,
    users,
    haveMoreEvent,
    lastDocSnapshot
  }
};

const mapDispatchToProps = (dispatch) => {
  return{
    storeEventsAndUsers: (events, users, haveMoreEvent, lastDocSnapshot) => dispatch(storeEventsAndUsers(events, users, haveMoreEvent, lastDocSnapshot))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
