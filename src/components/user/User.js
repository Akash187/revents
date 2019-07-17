import React, {useState, useEffect} from 'react';
import UserInfoHeader from "./UserInfoHeader";
import { Grid, Button, Card, Dimmer, Loader } from 'semantic-ui-react';
import UserMoreInfo from "./UserMoreInfo";
import UserPhotos from "./UserPhotos";
import UserEvents from "./UserEvents";
import DynamicScrollToTop from "../../routes/DynamicScrollToTop";
import {connect} from 'react-redux';
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import {followUser, unFollowUser} from "../../store/actions/profileActions";

const User = ({profile, hostEvents, guestEvents, uid, userId, submitting, history, followUser, unFollowUser}) => {

  const [following, setFollowing] = useState(false);

  useEffect(() => {
    if(profile && profile.follower){
      if(profile.follower.includes(uid)){
        setFollowing(true);
      }else{
        setFollowing(false);
      }
    }
  }, [profile]);

  return (
    profile ? <div>
      <DynamicScrollToTop/>
      <UserInfoHeader profile={profile}/>
      <Grid coloumns={2}>
        <Grid.Column mobile={16} tablet={12} computer={12}>
          <UserMoreInfo profile={profile}/>
          <UserPhotos profile={profile}/>
          <UserEvents hostEvents={hostEvents || []} guestEvents={guestEvents || []}/>
        </Grid.Column>
        <Grid.Column mobile={16} tablet={4} computer={4}>
          <Card fluid>
            <Card.Content>
              {(userId === uid) ? <Button basic color='orange' fluid onClick={() => history.push('/settings/basic')}>
                Update Profile
              </Button> : (!following) ? <Button basic color='green' fluid loading={submitting} onClick={() => followUser(uid, profile.id, profile.name)}>
                Follow User
              </Button>: <Button basic color='red' fluid loading={submitting} onClick={() => unFollowUser(uid, profile.id, profile.name)}>
                Unfollow User
              </Button>}
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    </div> : <Dimmer active inverted>
      <Loader inverted>Loading</Loader>
    </Dimmer>
  );
};

const mapStateToProps = ({firestore, firebase, form: {submitting}}, ownProps) => {
  return{
    hostEvents: firestore.ordered.hostEvents,
    guestEvents: firestore.ordered.guestEvents,
    userId: ownProps.match.params.id,
    uid: firebase.auth.uid,
    profile: firestore.ordered.profile ? firestore.ordered.profile[0] : undefined,
    submitting
  }
};

const mapDispatchToProps = (dispatch) => {
  return{
    followUser: (uid, userId, userName) => dispatch(followUser(uid, userId, userName)),
    unFollowUser: (uid, userId, userName) => dispatch(unFollowUser(uid, userId, userName))
  }
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => [{
    collection: 'users',
    doc: props.userId,
    storeAs: 'profile'
  },{
    collection: 'events',
    where: [
      ['createdBy', '==', props.userId],
    ],
    storeAs: 'hostEvents'
  },{
    collection: 'events',
    where: [
      ["attendeeList", "array-contains", props.userId],
    ],
    storeAs: 'guestEvents'
  }])
)(User);

