import React, { useState, useEffect } from 'react';
import ReactAutocomplete from 'react-autocomplete';
import {Message} from "semantic-ui-react";

const appId = process.env.REACT_APP_HERE_MAPS_APP_ID;
const appCode = process.env.REACT_APP_HERE_MAPS_APP_CODE;

const wrapperStyle = {display : 'flex', marginBottom: '1rem'};

const menuStyle = {
  borderRadius: '3px',
  zIndex: 999,
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
  background: 'rgba(255, 255, 255)',
  padding: '2px 0',
  fontSize: '100%',
  position: 'fixed',
  bottom: '5%',
  overflow: 'auto', // TODO: don't cheat, let it flow to the bottom
  height: '120px'
};

const EventFormLocation = ({values, touched, errors, setFieldValue}) =>{

  const [cityOptions, setCityOptions] = useState([]);
  const [city, setCity] = useState('');
  const [cityLatLng, setCityLatLng] = useState({lat: 0, lng: 0});
  const [venueOptions, setVenueOptions] = useState([]);
  const [venue, setVenue] = useState('');
  const [venueLatLng, setVenueLatLng] = useState({lat: 0, lng: 0});

  const fetchLatLng = query => {
    return fetch(`https://geocoder.cit.api.here.com/6.2/geocode.json?searchtext=${query}&app_id=${appId}&app_code=${appCode}&gen=8`)
      .then(res => res.json())
      .then(res => {
        try{
          let latlng = res['Response']['View'][0]['Result'][0]['Location']['DisplayPosition'];
          return {lat: latlng.Latitude, lng: latlng.Longitude};
        }catch (err){
          return {lat: 0, lng: 0};
        }
      });
  };

  const autoCompleteCity = query => {
    setCity(query);
    if(query.length > 2) {
      fetch(`http://autocomplete.geocoder.api.here.com/6.2/suggest.json?query=${query}&app_id=${appId}&app_code=${appCode}`)
        .then(res => res.json())
        .then(async res => {
          let suggestedCities = res.suggestions.map((suggestion) => (
            {id: suggestion.label, label: suggestion.label}
          ));
          setCityOptions(suggestedCities);
          setCityLatLng(await fetchLatLng(city).then((res) => res));
        });
    }else{
      setTimeout(() => {
        setCityOptions([]);
      }, 1000);
    }
  };

  const selectCity = async (city) => {
    setCity(city);
    setCityLatLng(await fetchLatLng(city).then((res) => res));
  };

  const autoCompleteVenue = query => {
    setVenue(query);
    if(query.length > 2) {
      fetch(`https://places.demo.api.here.com/places/v1/suggest?at=${cityLatLng.lat}%2C${cityLatLng.lng}&q=${query}&app_id=${appId}&app_code=${appCode}`)
        .then(res => res.json())
        .then(async res => {
          let suggestedVenue = res.suggestions.map((suggestion) => (
            {id: suggestion, label: suggestion}
          ));
          setVenueOptions(suggestedVenue);
          setVenueLatLng(await fetchLatLng(venue).then((res) => res));
        });
    }else{
      setTimeout(() => {
        setVenueOptions([]);
      }, 1000);
    }
  };

  const selectVenue = async (venue) => {
    setVenue(venue);
    setVenueLatLng(await fetchLatLng(venue).then((res) => res));
  };

  useEffect(() => {
    setFieldValue('city', city);
  },[city]);

  useEffect(() => {
    setFieldValue('venue', venue);
  },[venue]);

  useEffect(() => {
    setFieldValue('latLng', venueLatLng);
  },[venueLatLng]);

  useEffect(() => {
    console.log('Test 123');
    console.log(cityLatLng);
    console.log(venueLatLng);
  },[cityLatLng, venueLatLng]);

  return (
    <div>
      <ReactAutocomplete
        wrapperStyle = {wrapperStyle}
        items={cityOptions}
        inputProps={{ placeholder: 'Event City' }}
        menuStyle = {{...menuStyle, display : cityOptions.length > 0 ? 'block' : 'none'}}
        //shouldItemRender={(item, value) => item.label.indexOf(value.toLowerCase()) > -1}
        getItemValue={item => item.label}
        renderItem={(item, highlighted) =>
          <div
            key={item.id}
            style={{ backgroundColor: highlighted ? '#eee' : 'transparent', padding: '4px', borderBottom: '1px solid rgba(0, 0, 0, 0.2)'}}
          >
            {item.label}
          </div>
        }
        value={values.city}
        onChange={e => autoCompleteCity( e.target.value )}
        onSelect={value => selectCity(value)}
      />
      {errors.city && touched.city && <Message style={{ marginBottom: '1rem'}} size='mini' negative header={errors.city}/>}

      <ReactAutocomplete
        wrapperStyle = {wrapperStyle}
        items={venueOptions}
        inputProps={{ placeholder: 'Event Venue' }}
        menuStyle = {{...menuStyle, display : venueOptions.length > 0 ? 'block' : 'none'}}
        //shouldItemRender={(item, value) => item.label.indexOf(value.toLowerCase()) > -1}
        getItemValue={item => item.label}
        renderItem={(item, highlighted) =>
          <div
            key={item.id}
            style={{ backgroundColor: highlighted ? '#eee' : 'transparent', padding: '4px', borderBottom: '1px solid rgba(0, 0, 0, 0.2)'}}
          >
            {item.label}
          </div>
        }
        value={values.venue}
        onChange={e => autoCompleteVenue( e.target.value )}
        onSelect={value => selectVenue( value )}
      />
      {errors.venue && touched.venue && <Message style={{ marginBottom: '1rem'}} size='mini' negative header={errors.venue}/>}
    </div>
  );
};

export default EventFormLocation;
