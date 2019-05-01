import React from 'react';
import { Grid } from 'semantic-ui-react';
import EventInfo from "./EventInfo";
import AttendeeList from "./AttendeeList";
import DynamicScrollToTop from "../../routes/DynamicScrollToTop";

const EventDetail = () => {
  return (
    <div>
      <DynamicScrollToTop/>
      <Grid>
        <Grid.Column mobile={16} computer={10}>
          <EventInfo/>
        </Grid.Column>
        <Grid.Column mobile={16} computer={6}>
          <AttendeeList/>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default EventDetail;
