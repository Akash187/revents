import React from 'react';
import { Card, Image } from 'semantic-ui-react';

const UserInfoHeader = () => {
  return (
    <Card fluid>
      <Card.Content className='user-info-header'>
        <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' size='small' circular />
        <div className='user-info-header-detail'>
          <h2 className='no-margin'>Akash Kumar Seth</h2>
          <h4 className='no-margin'>Doctor</h4>
          <h4 className='no-margin'>41, Pragtipuram Colony, Raebareli</h4>
        </div>
      </Card.Content>
    </Card>
  );
};

export default UserInfoHeader;
