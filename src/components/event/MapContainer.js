import React from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  maxHeight: '100%'
};

const MapContainer = (props) => {
  return(
    <Map
      google={props.google}
      zoom={8}
      style={mapStyles}
      initialCenter={{
        lat: 27.141237,
        lng: 80.8833819
      }}
    />
  )
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(MapContainer);