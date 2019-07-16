import React, {Fragment} from 'react';
import Event from "./Event";
import InfiniteScroll from 'react-infinite-scroller';
import {Loader} from 'semantic-ui-react';

const Events = ({events, users, fetchMoreEvents, haveMoreData}) => {

  return (
    <Fragment>
      <InfiniteScroll
        pageStart={0}
        loadMore={fetchMoreEvents}
        hasMore={haveMoreData}
        loader={<Loader key={0} active size='small' inline='centered'>Loading...</Loader>}
      >
        {events.map((event) => <Event key={event.id} event={event} users={users}/>)}
      </InfiniteScroll>
    </Fragment>
  );
};

export default Events;
