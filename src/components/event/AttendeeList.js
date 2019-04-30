import React, { useState } from 'react';
import { Card, Segment, Header, Image, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const AttendeeList = () => {

  const [host, setHost] = useState(false);

  return (
    <Card fluid>
      <Segment inverted size='large' color='teal' style={{ marginBottom: 0 }}>
        <Header as='h5' textAlign='center'>2 People Going</Header>
      </Segment>
      <Card.Content>
        <div className="attendee">
          <Label as='a' color='orange' ribbon='right'>
            Host
          </Label>
          <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' size='tiny' style={{ marginLeft: -55}}/>
          <Link to='/'>
            <Header as='h3' color='blue' style={{ marginTop: 0, marginLeft: 10}}>Clark</Header>
          </Link>
        </div>
      </Card.Content>
      <Card.Content>
        <div className="attendee">
          {host && <Label as='a' color='orange' ribbon='right'>
            Host
          </Label>}
          <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' size='tiny' style={{ marginLeft: host ? -50 : 0}}/>
          <Link to='/'>
            <Header as='h3' color='blue' style={{ marginTop: 0, marginLeft: 10}}>Clark</Header>
          </Link>
        </div>
      </Card.Content>
    </Card>
  );
};

export default AttendeeList;

{/*<Segment style={{ margin: 0 }}>*/}
  {/*<div className="attendee">*/}
    {/*<Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' size='tiny'/>*/}
    {/*<Link to='/'>*/}
      {/*<Header as='h3' color='blue' style={{ marginTop: 0, marginLeft: 10}}>Clark</Header>*/}
    {/*</Link>*/}
  {/*</div>*/}
{/*</Segment>*/}
{/*<Segment style={{ margin: 0 }}>*/}
{/*<div className="attendee">*/}
  {/*<Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' size='tiny'/>*/}
  {/*<Link to='/'>*/}
{/*<Header as='h3' color='blue' style={{ marginTop: 0, marginLeft: 10}}>Clark</Header>*/}
{/*</Link>*/}
{/*</div>*/}
{/*</Segment>*/}