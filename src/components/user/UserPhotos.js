import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import LazyLoad from 'react-lazyload';

const UserPhotos = ({profile}) => {
  return (
    <Card fluid>
      {profile && <Card.Content>
        <div className='user-photos-header'>
          <Icon name='image outline' size='big' />
          <h3 className='no-margin'>Photos</h3>
        </div>
        <div style={{ marginTop: '1rem' }}>
          <LazyLoad>
          <Image.Group size='small'>
            {profile.images && profile.images.map((image, index) => <Image key={index + 100} src={image}/>)}
          </Image.Group>
          </LazyLoad>
        </div>
      </Card.Content>}
    </Card>
  );
};

export default UserPhotos;
