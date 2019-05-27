import React from 'react';
import { Grid } from 'semantic-ui-react';
import EventInfo from "./EventInfo";
import AttendeeList from "./AttendeeList";
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import DynamicScrollToTop from "../../routes/DynamicScrollToTop";

const EventDetail = ({event}) => {

  return (
    <div>
      <DynamicScrollToTop/>
      <Grid>
        <Grid.Column mobile={16} computer={10}>
          {event && <EventInfo event={event}/>}
        </Grid.Column>
        <Grid.Column mobile={16} computer={6}>
          <AttendeeList/>
        </Grid.Column>
      </Grid>
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
