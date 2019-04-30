import React, {useState} from 'react';
import { Card, Header, Button } from 'semantic-ui-react';

const EventInfoHeader = () => {

  const [loading, setLoading] = useState(false);
  const [joined, setJoined] = useState(true);

  return (
    <Card fluid>
      <div className='eventInfo-head' style ={ { backgroundImage: `url('/assets/categoryImages/drinks.jpg')`} }>
        <Header
          inverted
          as = 'h1'
          content={`Clarkes event`}
          subheader= {`Friday 27th April`}/>
        <Header.Subheader
          content={`Hosted by Clark`}
        />
      </div>
      <Card.Content>
        {
          joined ? <Button loading={loading || false} color='teal'>Join The Event</Button> :
            <Button loading={loading || false} color='teal'>Cancel My Place</Button>
        }
      </Card.Content>
    </Card>
  );
};

export default EventInfoHeader;
