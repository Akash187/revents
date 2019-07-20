import React, {useState, useEffect} from 'react';
import { Card, Segment, Header, Image, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import {firestore} from "../../config/fbConfig";
import {connect} from 'react-redux';

const AttendeeList = ({host, attendeeList, eventConcluded}) => {

  const [attendees, setAttendees] = useState({});

  useEffect(() => {
    if(attendeeList.length > 0) {
      let promises = attendeeList.map(async (userId) => {
        if (!(userId in attendees)) {
          let doc = await firestore.collection("users").doc(userId).get();
          return new Promise((res, rej) => res({id: userId, ...doc.data()}))
        } else {
          return new Promise((res, rej) => res(attendees[userId]))
        }
      });

      Promise.all(promises)
        .then((results) => {
          let users = {};
          results.forEach(result => {
            users[result.id] = result
          });
          setAttendees(users);
        });
    }else{
      setAttendees({});
    }
  }, [attendeeList]);

  return (
    <div className='notification'>
      <Card fluid>
        <Segment inverted size='large' color='teal' style={{ marginBottom: 0 }}>
          <Header as='h5' textAlign='center'>{`${attendeeList.length + 1} People ${eventConcluded ? 'attended' : 'going'}`}</Header>
        </Segment>
        <Card.Content>
          <div className="attendee">
            <Label as='a' color='orange' ribbon='right'>
              Host
            </Label>
            <Image src={host.images ? host.images[0] : '/assets/user.png'} size='tiny' style={{ marginLeft: -55}}/>
            <Link to={`/user/${host.id}`}>
              <Header as='h3' color={'blue'} style={{ marginTop: 0, marginLeft: 10}}>{host.name}</Header>
            </Link>
          </div>
        </Card.Content>
        <span style={{maxHeight: '324px', overflowY: 'auto'}}>
          {attendeeList.map(userId => {
            let attendee = attendees[userId];
            return attendee ? <Card.Content style={{padding: '14px'}} key={attendee.id}>
              <div className="attendee">
                <Image src={attendee.images ? attendee.images[0] : '/assets/user.png'} size='tiny'/>
                <Link to={`/user/${userId}`}>
                  <Header as='h3' color={'blue'} style={{ marginTop: 0, marginLeft: 10}}>{attendee.name}</Header>
                </Link>
              </div>
            </Card.Content> : <div/>
          })}
        </span>
      </Card>
    </div>
  );
};

const mapStateToProps = ({firebase: {auth}}) => {
  return {
    uid: auth.uid
  }
};

export default connect(mapStateToProps)(AttendeeList);