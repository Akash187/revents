import React, {lazy, Suspense, useState } from 'react';
import {Card, Segment, Grid, Icon, Button, Dimmer, Loader} from 'semantic-ui-react';
import moment from 'moment';
const MapContainer = lazy(() => import("./MapContainer"));

const EventMoreInfo = ({detail, dateTime, venue, latLng}) => {

  const [showMap, setShowMap] = useState(false);

  return (
    <div>
      <Card fluid>
        <Segment.Group style={{marginBottom: 0}}>
          <Segment>
            <Grid columns={2}>
              <Grid.Column width={1} className='centerElement'>
                <Icon color='teal' name='info' size='large'/>
              </Grid.Column>
              <Grid.Column width={15} className='centerElement'>
                {detail}
              </Grid.Column>
            </Grid>
          </Segment>
          <Segment>
            <Grid columns={2}>
              <Grid.Column width={1} className='centerElement'>
                <Icon color='teal' name='calendar alternate outline' size='large'/>
              </Grid.Column>
              <Grid.Column width={15} className='centerElement'>
                {moment(dateTime*1000).format('dddd Do MMMM')} at {moment(dateTime*1000).format('LT')}
              </Grid.Column>
            </Grid>
          </Segment>
          <Segment>
            <Grid columns={3}>
              <Grid.Column width={1} className='centerElement'>
                <Icon color='teal' name='map marker alternate' size='large'/>
              </Grid.Column>
              <Grid.Column width={11} className='centerElement'>
                {venue}
              </Grid.Column>
              <Grid.Column width={4}>
                <Button color='teal' onClick={() => setShowMap(!showMap)} floated='right'>Show Map</Button>
              </Grid.Column>
            </Grid>
          </Segment>
        </Segment.Group>
        {showMap && <Segment style={{ height: 360, padding: 0, margin: 0}}>
          <Suspense fallback={<Dimmer active>
            <Loader />
          </Dimmer>}>
            <MapContainer latLng={latLng} venue={venue}/>
          </Suspense>
        </Segment>}
      </Card>
    </div>
  );
};

export default EventMoreInfo;
