import React from 'react';
import { Card, Feed } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import {compose} from "redux";
import moment from 'moment';

const Notification = ({notifications}) => {

  return (
    <div className='notification'>
      <Card fluid>
        <Card.Content>
          <Card.Header>Recent Activity</Card.Header>
        </Card.Content>
        <Card.Content>
          <Feed size='large'>
            {notifications && notifications.map(notification => <Feed.Event key={notification.id}>
              <Feed.Label className="notification-img" image={notification.image} />
              <Feed.Content>
                <Feed.Summary>
                  {notification.content}!
                  <Link to={`/user/${notification.userId}`}> {notification.userName} </Link>
                  {notification.content === 'New Event' ? 'is hosting' : notification.content === 'Event Cancelled' ? 'has cancelled' : 'has updated'}
                  <Link to={`/event/${notification.eventId}`}> {notification.eventName}</Link>.
                </Feed.Summary>
                <Feed.Meta>
                  <Feed.Date content={moment(notification.addedAt.toDate()).fromNow()} />
                </Feed.Meta>
              </Feed.Content>
            </Feed.Event>)}
          </Feed>
        </Card.Content>
      </Card>
    </div>
  );
};

const mapStateToProps = ({firestore : {ordered}}) => {
  return{
    notifications : ordered.notifications ? ordered.notifications : []
  }
};

export default compose(
  connect(mapStateToProps, null),
  firestoreConnect(props => [
    {
      collection: 'notifications',
      orderBy: ['addedAt', 'desc'],
      limit: 5
    },
  ])
)(Notification);
