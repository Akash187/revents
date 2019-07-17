import React from 'react';
import UserEvent from "./UserEvent";

const UserEventList = ({allEvents}) => {

  return (
    (allEvents.length > 0) ? <div className='user-event-list'>
      {allEvents.map(event => <UserEvent key={event.id} event={event}/>)}
    </div>: <div>No Events Found</div>
  );
};

export default UserEventList;
