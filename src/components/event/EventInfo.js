import React from 'react';
import EventMoreInfo from "./EventMoreInfo";
import EventComment from "./EventComment";
import EventInfoHeader from './EventInfoHeader';

const EventInfo = ({event, host, eventConcluded}) => {

  return (
    <div>
      <EventInfoHeader event={event} host={host} eventConcluded={eventConcluded} attendeeList={event.attendeeList ? event.attendeeList : []}/>
      <EventMoreInfo detail={event.detail} venue={event.venue} dateTime={event.dateTime.seconds} latLng={event.latLng}/>
      <EventComment eventId={event.id} eventConcluded={eventConcluded} comments={event.comments || []}/>
    </div>
  );
};

export default EventInfo;
