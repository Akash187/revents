import React from 'react';
import { Grid } from 'semantic-ui-react';
import Events from "./Events";
import Notification from "./Notification";

const Dashboard = () => {
  return (
    <Grid>
      <Grid.Column mobile={16} computer={10}>
        <Events/>
      </Grid.Column>
      <Grid.Column mobile={16} computer={6}>
        <Notification/>
      </Grid.Column>
    </Grid>
  );
};

export default Dashboard;
