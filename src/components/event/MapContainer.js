import React from 'react';
import HEREMap, { Marker } from 'here-maps-react';

class MapContainer extends React.Component {

  render() {
    return (
      <HEREMap
        appId="41vHI9jzlfI9NfGkEzgw"
        appCode="JX43Cz50wpoOLYBrxyD7yw"
        center={this.props.latLng}
        zoom={14}
        interactive
      >
        <Marker lat={this.props.latLng.lat} lng={this.props.latLng.lng} >
          <div>Hello World</div>
        </Marker>
      </HEREMap>
    )
  }
}

export default MapContainer;