import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';

const UserPhotos = () => {
  return (
    <Card fluid>
      <Card.Content>
        <div className='user-photos-header'>
          <Icon name='image outline' size='big' />
          <h3 className='no-margin'>Photos</h3>
        </div>
        <div style={{ marginTop: '1rem' }}>
          <Image.Group size='small'>
            <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png'/>
            <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png'/>
            <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png'/>
          </Image.Group>
        </div>
      </Card.Content>
    </Card>
  );
};

export default UserPhotos;
