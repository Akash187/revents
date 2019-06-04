import React, { useState, useEffect } from 'react';
import {Message} from "semantic-ui-react";
import PlacesAutoComplete from "../layout/PlacesAutocomplete";

const appId = process.env.REACT_APP_HERE_MAPS_APP_ID;
const appCode = process.env.REACT_APP_HERE_MAPS_APP_CODE;

const EventFormLocation = ({values, touched, errors, setFieldValue}) =>{

  const [cityOptions, setCityOptions] = useState([]);
  const [city, setCity] = useState('');
  const [cityLatLng, setCityLatLng] = useState({lat: 0, lng: 0});
  const [venueOptions, setVenueOptions] = useState([]);
  const [venue, setVenue] = useState('');
  const [venueLatLng, setVenueLatLng] = useState({lat: 0, lng: 0});
  const [timeOut, setTimeOut] = useState(0);

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
    if(timeOut) clearTimeout(timeOut);
    setCity(query);
    if(query.length > 2) {
      setTimeOut(setTimeout(() => {
        fetch(`http://autocomplete.geocoder.api.here.com/6.2/suggest.json?query=${query}&app_id=${appId}&app_code=${appCode}`)
          .then(res => res.json())
          .then(async res => {
            let suggestedCities = res.suggestions.map((suggestion, index) => (
              {id: `city${index}`, label: suggestion.label}
            ));
            setCityOptions(suggestedCities);
            setCityLatLng(await fetchLatLng(city).then((res) => res));
          });
      },500));
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
    if(timeOut) clearTimeout(timeOut);
    setVenue(query);
    if(query.length > 2) {
      setTimeOut(setTimeout(() => {
        fetch(`https://places.demo.api.here.com/places/v1/suggest?at=${cityLatLng.lat}%2C${cityLatLng.lng}&q=${query}&app_id=${appId}&app_code=${appCode}`)
          .then(res => res.json())
          .then(async res => {
            if(res.suggestions){
              let suggestedVenue = res.suggestions.map((suggestion, index) => (
                {id: `venue${index}`, label: suggestion}
              ));
              setVenueOptions(suggestedVenue);
              setVenueLatLng(await fetchLatLng(venue).then((res) => res));
            }
          });
      }, 500));
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

  return (
    <div>
      <PlacesAutoComplete items={cityOptions} placeholder={'Event City'} value={values.city} onChange={autoCompleteCity} onSelect={selectCity}/>
      {errors.city && touched.city && <Message style={{ marginBottom: '1rem'}} size='mini' negative header={errors.city}/>}

      <PlacesAutoComplete items={venueOptions} placeholder={'Event Venue'} value={values.venue} onChange={autoCompleteVenue} onSelect={selectVenue}/>
      {errors.venue && touched.venue && <Message style={{ marginBottom: '1rem'}} size='mini' negative header={errors.venue}/>}
    </div>
  );
};

export default EventFormLocation;
