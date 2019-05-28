import React from 'react';
import { Grid } from 'semantic-ui-react';
import Events from "./Events";
import Notification from "./Notification";
import DynamicScrollToTop from "../../routes/DynamicScrollToTop";
import {Loader, Dimmer} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

const Dashboard = ({events}) => {
  return (
    <div>
      <DynamicScrollToTop/>
      {events ? <Grid>
        <Grid.Column mobile={16} computer={10}>
          <Events events={events}/>
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

const mapStateToProps = ({firestore: {ordered}}) => {
  return{
    events: ordered.events
  }
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => [
    {
      collection: 'events', orderBy: ['createdAt', 'desc']
    }
  ])
)(Dashboard);
