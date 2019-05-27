import React from 'react';
import EventMoreInfo from "./EventMoreInfo";
import EventComment from "./EventComment";
import EventInfoHeader from './EventInfoHeader';

const EventInfo = ({event}) => {

  return (
    <div>
      <EventInfoHeader name={event.name} dateTime={event.dateTime.seconds} about={event.about}/>
      <EventMoreInfo detail={event.detail} venue={event.venue} dateTime={event.dateTime.seconds} latLng={event.latLng}/>
      <EventComment/>
    </div>
  );
};

export default EventInfo;
