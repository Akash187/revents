import React, {useEffect, useState} from 'react';
import Person from "./Person";
import {Card} from "semantic-ui-react";
import {firestore} from "../../config/fbConfig";

const Followers = ({follower}) => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    if(follower && follower.length > 0){
      let promises = follower.map(async (userId) => {
        let doc = await firestore.collection("users").doc(userId).get();
        return new Promise((res, rej) => res({id: userId, ...doc.data()}));
      });

      Promise.all(promises)
        .then((results) => {
          setUsers(results);
        });
    }
  }, [follower]);

  return (
    <Card fluid style={{marginBottom: '2rem'}}>
      <Card.Content>
        <Card.Header>Followers</Card.Header>
      </Card.Content>
      <Card.Content className='followers-list'>
        {users.length > 0 ? users.map(user => <Person user={user} key={'zxccx'+user.id}/>): '0 Follower'}
      </Card.Content>
    </Card>
  );
};

export default Followers;
