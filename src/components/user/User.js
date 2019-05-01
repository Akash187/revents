import React from 'react';
import UserInfoHeader from "./UserInfoHeader";
import { Grid, Button, Card } from 'semantic-ui-react';
import UserMoreInfo from "./UserMoreInfo";
import UserPhotos from "./UserPhotos";
import UserEvents from "./UserEvents";

const User = () => {
  return (
    <div>
      <UserInfoHeader/>
      <Grid coloumns={2}>
        <Grid.Column mobile={16} tablet={12} computer={12}>
          <UserMoreInfo/>
          <UserPhotos/>
          <UserEvents/>
        </Grid.Column>
        <Grid.Column mobile={16} tablet={4} computer={4}>
          <Card fluid>
            <Card.Content>
              <Button basic color='green' fluid>
                Follow User
              </Button>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default User;
