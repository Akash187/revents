import React, {useState, useEffect} from 'react';
import Person from "./Person";
import {Card} from "semantic-ui-react";
import {firestore} from "../../config/fbConfig";

const Following = ({following}) => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    if(following && following.length > 0){
      let promises = following.map(async (userId) => {
        let doc = await firestore.collection("users").doc(userId).get();
        return new Promise((res, rej) => res({id: userId, ...doc.data()}));
      });

      Promise.all(promises)
        .then((results) => {
          setUsers(results);
        });
    }
  }, [following]);

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>Following</Card.Header>
      </Card.Content>
      <Card.Content className='following-list'>
        {users.length > 0 ? users.map(user => <Person user={user} key={'asds'+user.id}/>): 'You are not following anyone.'}
      </Card.Content>
    </Card>
  );
};

export default Following;
