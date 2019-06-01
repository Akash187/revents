import React, { useState } from 'react';
import ReactAutocomplete from 'react-autocomplete';

const HereMapContainer = () =>{

  const [cityOptions, setCityOptions] = useState([]);
  const [city, setCity] = useState();

  const autocompleteCity = query => {
    setCity(query);
    if(query.length > 2) {
      fetch(`http://autocomplete.geocoder.api.here.com/6.2/suggest.json?query=${query}&app_id=41vHI9jzlfI9NfGkEzgw&app_code=JX43Cz50wpoOLYBrxyD7yw`)
        .then(res => res.json())
        .then(res => {
          let suggestedCities = res.suggestions.map((suggestion) => (
            { id: suggestion.label, label: suggestion.label }
          ));
          setCityOptions(suggestedCities);
        });
    }else{
      setCityOptions([]);
    }
  };
  return (
    <div>
      <ReactAutocomplete
        wrapperStyle = {{ display : 'flex', marginBottom: '1rem'}}
        items={cityOptions}
        inputProps={{ placeholder: 'Event City' }}
        menuStyle = {
          {
            borderRadius: '3px',
            zIndex: 999,
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
            background: 'rgba(255, 255, 255)',
            padding: '2px 0',
            fontSize: '100%',
            position: 'fixed',
            bottom: '5%',
            overflow: 'auto', // TODO: don't cheat, let it flow to the bottom
            display : cityOptions.length > 0 ? 'block' : 'none'
          }
        }
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
        value={city}
        onChange={e => autocompleteCity( e.target.value )}
        onSelect={value => setCity( value )}
      />
    </div>
  );
};

export default HereMapContainer;
