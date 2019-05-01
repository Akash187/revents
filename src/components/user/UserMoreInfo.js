import React from 'react';
import { Card, Grid, Icon } from 'semantic-ui-react';

const UserMoreInfo = () => {
  return (
    <Card fluid>
      <Card.Content>
        <Grid columns={2}>
          <Grid.Column width={8}>
            <div className='user-more-info-header'>
              <Icon name='smile outline' size='big' />
              <h3 className='no-margin'>About me</h3>
            </div>
            <div style={{marginTop: '1rem'}}>
              <p>My Profession is : <b>Doctor</b></p>
            </div>
            <div style={{marginTop: '0.5rem'}}>
              <p>I came from :  <b>Poland</b></p>
            </div>
            <div style={{marginTop: '0.5rem'}}>
              <p>I am a member from : <b>27 Feb 2019</b></p>
            </div>
          </Grid.Column>
          <Grid.Column width={8}>
            <div className='user-more-info-header'>
              <Icon name='heart outline' size='big' />
              <h3 className='no-margin'>Interests</h3>
            </div>
            <div className='user-more-info-content' style={{marginTop: '1rem'}}>
              <Icon name='heart'/>
              <p>culture</p>
            </div>
            <div className='user-more-info-content' style={{marginTop: '0.5rem'}}>
              <Icon name='heart'/>
              <p>music</p>
            </div>
            <div className='user-more-info-content' style={{marginTop: '0.5rem'}}>
              <Icon name='heart'/>
              <p>food</p>
            </div>
          </Grid.Column>
        </Grid>
      </Card.Content>
    </Card>
  );
};

export default UserMoreInfo;
