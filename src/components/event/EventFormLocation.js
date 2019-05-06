import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';
import {Message} from "semantic-ui-react";

export default class EventFormLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { city: this.props.values.city, cityLatLng:{Lat: '', Lng: ''},  venue: this.props.values.venue};
  }

  handleChangeCity = city => {
    this.setState({ city });
    this.props.setFieldValue('city', city);
  };

  handleChangeVenue = venue => {
    this.setState({ venue });
    this.props.setFieldValue('venue', venue);
  };

  handleSelectCity = city => {
    this.setState({city});
    this.props.setFieldValue('city', city);
    geocodeByAddress(city)
      .then(results => {
        return getLatLng(results[0])
      })
      .then(latLng => {
        this.setState({
          cityLatLng: latLng,
          searchOptions: {
            location: new window.google.maps.LatLng(latLng.lat, latLng.lng),
            radius: 1000,
            types: []
          }});
      })
      .catch(error => console.error('Error', error));
  };

  handleSelectVenue = (venue) => {
    this.setState({venue});
    this.props.setFieldValue('venue', venue);
    geocodeByAddress(venue)
      .then(results => {
        return getLatLng(results[0])
      })
      .then(latLng => this.props.setFieldValue('latLng', latLng))
      .catch(error => console.error('Error', error));
  };

  render() {

    let {errors, touched} = {...this.props};

    return (
      <div>
        <div style={{ margin: '1rem 0'}}>
          <PlacesAutocomplete
            value={this.state.city}
            onChange={this.handleChangeCity}
            onSelect={this.handleSelectCity}
            googleCallbackName="initOne"
          >
            {({ getInputProps, suggestions, getSuggestionItemProps}) => (
              <div>
                <input
                  {...getInputProps({
                    placeholder: 'Event City',
                    className: 'location-search-input',
                  })}
                />

                <div className={suggestions.length > 0 ? "autocomplete-dropdown-container" : "notaclass"}>
                  {suggestions.map(suggestion => {
                    const className = suggestion.active
                      ? 'suggestion-item--active'
                      : 'suggestion-item';
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: '#fafafa', cursor: 'pointer', padding: 8}
                      : { backgroundColor: '#ffffff', cursor: 'pointer' , padding: 8};
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style,
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
          {errors.city && touched.city && <Message style={{ marginBottom: '1rem'}} size='mini' negative header={errors.city}/>}
        </div>
        <div style={{ marginBottom: '1rem'}}>
          <PlacesAutocomplete
            value={this.state.venue}
            onChange={this.handleChangeVenue}
            onSelect={this.handleSelectVenue}
            searchOptions={this.state.searchOptions}
            googleCallbackName="initTwo"
          >
            {({ getInputProps, suggestions, getSuggestionItemProps}) => (
              <div>
                <input
                  {...getInputProps({
                    placeholder: 'Event Venue',
                    className: 'location-search-input',
                  })}
                />

                <div className={suggestions.length > 0 ? "autocomplete-dropdown-container" : "notaclass"}>
                  {suggestions.map(suggestion => {
                    const className = suggestion.active
                      ? 'suggestion-item--active'
                      : 'suggestion-item';
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: '#fafafa', cursor: 'pointer', padding: 8}
                      : { backgroundColor: '#ffffff', cursor: 'pointer' , padding: 8};
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style,
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
          {errors.venue && touched.venue && <Message style={{ marginBottom: '1rem'}} size='mini' negative header={errors.venue}/>}
        </div>
      </div>
    );
  }
};