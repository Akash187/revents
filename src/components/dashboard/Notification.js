import React from 'react';
import { Card, Feed } from 'semantic-ui-react';
import user from '../../assets/user.png';
import { Link } from 'react-router-dom';

const Notification = () => {

  return (
    <div className='notification'>
      <Card fluid>
        <Card.Content>
          <Card.Header>Recent Activity</Card.Header>
        </Card.Content>
        <Card.Content>
          <Feed size='large'>
            <Feed.Event>
              <Feed.Label image={user} />
              <Feed.Content>
                <Feed.Summary>
                  You added <Link to='/'>Jenny Hess</Link> to your <Link to='/'>coworker</Link> group.
                </Feed.Summary>
                <Feed.Meta>
                  <Feed.Date content='1 day ago' />
                </Feed.Meta>
              </Feed.Content>
            </Feed.Event>

            <Feed.Event>
              <Feed.Label image={user} />
              <Feed.Content>
                <Feed.Summary>
                  You added <Link to='/'>Jenny Hess</Link> to your <Link to='/'>coworker</Link> group.
                </Feed.Summary>
                <Feed.Meta>
                  <Feed.Date content='1 day ago' />
                </Feed.Meta>
              </Feed.Content>
            </Feed.Event>

            <Feed.Event>
              <Feed.Label image={user} />
              <Feed.Content>
                <Feed.Summary>
                  You added <Link to='/'>Jenny Hess</Link> to your <Link to='/'>coworker</Link> group.
                </Feed.Summary>
                <Feed.Meta>
                  <Feed.Date content='1 day ago' />
                </Feed.Meta>
              </Feed.Content>
            </Feed.Event>
          </Feed>
        </Card.Content>
      </Card>
    </div>
  );
};

export default Notification;
