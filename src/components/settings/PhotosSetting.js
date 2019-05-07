import React, { useState, useEffect } from 'react';
import {Card, Grid, Header, Button, Divider} from "semantic-ui-react";
import ImageUpload from "./ImageUpload";
import CropImage from "./CropImage";

const PhotosSetting = () => {

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [reset, setReset] = useState(false);
  const [profileImages, setProfileImage] = useState([]);


  useEffect(() => {
    setPreview(null);
    setImage(null);
    setReset(false);
    console.log('change');
  },[reset]);

  return (
    <Card fluid>
      <Card.Header as='h1' className='setting-header'>My Photos</Card.Header>
      <Card.Content>
        <Grid columns={3}>
          <Grid.Column width={5}>
            <Header color='teal' size='tiny'>STEP1 - ADD PHOTO</Header>
            <ImageUpload setImage={setImage}/>
          </Grid.Column>
          <Grid.Column width={5}>
            <Header color='teal' size='tiny'>STEP2 - RESIZE IMAGE</Header>
            {image && <CropImage image={image} setPreview={setPreview}/>}
          </Grid.Column>
          <Grid.Column width={5}>
            <Header color='teal' size='tiny'>STEP 3 - PREVIEW AND UPLOAD</Header>
            {preview && <div>
              <img width='100%' height='240px' alt='Cropped Preview' src={preview}/>
              <Button.Group fluid>
                <Button positive icon='check' onClick={() => setProfileImage([...profileImages, preview])}/>
                <Button icon='cancel' onClick={() => setReset(true)}/>
              </Button.Group>
            </div>}
          </Grid.Column>
        </Grid>
        {profileImages.length > 0 &&
          <div>
            <Divider/>
            <Header color='teal' size='tiny' style={{marginBottom: '1rem'}}>ALL PHOTO</Header>
          </div>}
        <Grid>
          {profileImages[0] && <Grid.Column width={4}>
            <Card>
              <img width='100%' height='180px' alt='your profile img.' src={profileImages[0]}/>
              <Button fluid positive>Main Image</Button>
            </Card>
          </Grid.Column>}
          {profileImages.slice(1).map((image, index) => <Grid.Column key={index} width={4}>
            <Card>
              <img width='100%' height='180px' alt='your profile img.' src={image}/>
              <div className='ui two buttons'>
                <Button basic color='green'>
                  Main
                </Button>
                <Button basic icon='delete' color='red'/>
              </div>
            </Card>
          </Grid.Column>)}
        </Grid>
      </Card.Content>
    </Card>
  );
};

export default PhotosSetting;
