import React from 'react';
import EventMoreInfo from "./EventMoreInfo";
import EventComment from "./EventComment";
import EventInfoHeader from './EventInfoHeader';

const EventInfo = () => {

  return (
    <div>
      <EventInfoHeader/>
      <EventMoreInfo/>
      <EventComment/>
    </div>
  );
};

export default EventInfo;
