import React from 'react';
import HEREMap, { Marker } from 'here-maps-react';

class MapContainer extends React.Component {

  render() {
    return (
      <HEREMap
        appId={ process.env.REACT_APP_HERE_MAPS_APP_ID}
        appCode={ process.env.REACT_APP_HERE_MAPS_APP_CODE}
        center={this.props.latLng}
        zoom={14}
        interactive
      >
        <Marker lat={this.props.latLng.lat} lng={this.props.latLng.lng} >
          <div className='circle-marker' />
        </Marker>
      </HEREMap>
    )
  }
}

export default MapContainer;