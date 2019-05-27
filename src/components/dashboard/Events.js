import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { compose } from 'redux';
import Event from "./Event";

const Events = ({events}) => {
  return (
    <Fragment>
      {isLoaded(events) && events.map((event) => <Event key={event.id} event={event}/>)}
    </Fragment>
  );
};

const mapStateToProps = ({firestore: {ordered}}) => {
  return{
    events: ordered.events
  }
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => [
    {
      collection: 'events'
    }
  ])
)(Events);
