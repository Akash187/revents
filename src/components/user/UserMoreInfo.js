import React from 'react';
import moment from 'moment';
import { Card, Grid, Icon } from 'semantic-ui-react';

const UserMoreInfo = ({profile}) => {
  return (
    <Card fluid>
      {profile && <Card.Content>
        <Grid columns={2}>
          <Grid.Column width={8}>
            <div className='user-more-info-header'>
              <Icon name='smile outline' size='big' />
              <h3 className='no-margin'>About me</h3>
            </div>
            <div style={{marginTop: '1rem'}}>
              <p>My Profession is : <b>{profile.profession ? profile.profession : 'unknown'}</b></p>
            </div>
            <div className='userMoreInfo-field'>
              <p>I am born on : <b>{profile.birthDate ? moment(profile.birthDate.seconds*1000).format('Do MMMM YYYY') : 'unknown'}</b></p>
            </div>
            <div className='userMoreInfo-field'>
              <p>Gender : <b>{profile.gender ? profile.gender : 'unknown'}</b></p>
            </div>
            <div className='userMoreInfo-field'>
              <p>Status : <b>{profile.status ? profile.status : 'unknown'}</b></p>
            </div>
            <div className='userMoreInfo-field'>
              <p>I came from : <b>{profile.birthPlace ? profile.birthPlace : 'unknown'}</b></p>
            </div>
            <div className='userMoreInfo-field'>
              <p>I am a member from : <b>{moment(profile.createdAt.seconds*1000).format('Do MMMM YYYY') }</b></p>
            </div>
          </Grid.Column>
          <Grid.Column width={8}>
            <div className='user-more-info-header'>
              <Icon name='heart outline' size='big' />
              <h3 className='no-margin'>Interests</h3>
            </div>
            {profile.interests ? profile.interests.map((interest,index) => {
              return(<div key={index} className='user-more-info-content' style={{marginTop: '1rem'}}>
                <Icon name='heart'/>
                <p>{interest}</p>
              </div>)
            }): <div className='userMoreInfo-field'><p>Unknown</p></div>}
          </Grid.Column>
        </Grid>
      </Card.Content>}
    </Card>
  );
};

export default UserMoreInfo;
