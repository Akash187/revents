import React, {useState} from 'react';
import { Grid, Menu, Header } from 'semantic-ui-react';
import BasicSetting from "./BasicSetting";
import AboutMeSetting from "./AboutMeSetting";
import PhotosSetting from "./PhotosSetting";
import AccountSetting from "./AccountSetting";
import { withRouter, Route } from 'react-router-dom';

const Settings = (props) => {

  const [activeItem, setActiveItem] = useState(props.location.pathname.substring(10));

  return (
    <Grid columns={2}>
      <Grid.Column width={12}>
        <Route path='/settings/basic' component={ BasicSetting } />
        <Route path='/settings/aboutme' component={ AboutMeSetting } />
        <Route path='/settings/photos' component={ PhotosSetting } />
        <Route path='/settings/account' component={AccountSetting}/>
      </Grid.Column>
      <Grid.Column width={4}>
        <Menu vertical>
          <Header attached='top' icon='user' content='Profile' color='grey' inverted/>
          <Menu.Item
            name='Basics'
            active={activeItem === 'basic'}
            onClick={() => {
              setActiveItem('basic');
              //setComponent(BasicSetting);
              return props.history.push('/settings/basic');
            }}
          />
          <Menu.Item
            name='About Me'
            active={activeItem === 'aboutme'}
            onClick={() => {
              setActiveItem('aboutme');
              //setComponent(AboutMeSetting);
              return props.history.push('/settings/aboutme');
            }}
          />
          <Menu.Item
            name='My Photos'
            active={activeItem === 'photos'}
            onClick={() => {
              setActiveItem('photos');
              //setComponent(PhotosSetting);
              return props.history.push('/settings/photos');
            }}
          />
        </Menu>
        <Menu vertical>
          <Header attached='top' icon='settings' content='Account' color='grey' inverted/>
          <Menu.Item
            name='My Account'
            active={activeItem === 'account'}
            onClick={() => {
              setActiveItem('account');
              return props.history.push('/settings/account');
            }}
          />
        </Menu>
      </Grid.Column>
    </Grid>
  );
};

export default withRouter(Settings);
