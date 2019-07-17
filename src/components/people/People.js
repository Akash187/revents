import React from 'react';
import Following from "./Following";
import Followers from "./Followers";
import DynamicScrollToTop from "../../routes/DynamicScrollToTop";
import {connect} from 'react-redux';
import {Dimmer, Loader} from 'semantic-ui-react';

const People = ({profile}) => {
  return (
    (profile) ?
    <div>
      <DynamicScrollToTop/>
      <Following following={profile.following}/>
      <Followers follower={ profile.follower}/>
    </div> : (<Dimmer active inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>)
  );
};

const mapStateToProps = ({firebase: {profile}}) => {
  return{
    profile
  }
};

export default connect(mapStateToProps)(People);
