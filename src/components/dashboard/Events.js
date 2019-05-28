import React, {Fragment} from 'react';
import Event from "./Event";

const Events = ({events}) => {
  return (
    <Fragment>
      {events && events.map((event) => <Event key={event.id} event={event}/>)}
    </Fragment>
  );
};

export default Events;
