import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import LazyLoad from 'react-lazyload';

const UserInfoHeader = ({profile}) => {
  return (
    <Card fluid>
      {profile && <Card.Content className='user-info-header'>
        <LazyLoad>
        <Image src={profile.images ? profile.images[0] : '/assets/user.png'} size='small' circular />
        </LazyLoad>
        <div className='user-info-header-detail'>
          <h2 className='no-margin'>{profile.name}</h2>
          <h4 className='no-margin'>{profile.bio ? profile.bio : 'Bio not provided'}</h4>
          <h4 className='no-margin'>{profile.address ? profile.address : 'Address not provided'}</h4>
        </div>
      </Card.Content>}
    </Card>
  );
};

export default UserInfoHeader;
