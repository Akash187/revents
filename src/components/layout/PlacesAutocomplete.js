import React from 'react';
import ReactAutocomplete from 'react-autocomplete';

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
  maxHeight: '160px'
};

const PlacesAutoComplete = ({items, placeholder, value, onChange, onSelect}) =>{

  return (
    <div>
      <ReactAutocomplete
        wrapperStyle = {wrapperStyle}
        items={items}
        inputProps={{ placeholder: placeholder, type: 'text' }}
        menuStyle = {{...menuStyle, display : items.length > 0 ? 'block' : 'none'}}
        //shouldItemRender={(item, value) => item.label.indexOf(value.toLowerCase()) > -1}
        getItemValue={item => item.label}
        renderItem={(item, highlighted) =>
          <div
            key={item.id}
            style={{ backgroundColor: highlighted ? '#eee' : 'transparent', padding: '10px 8px', borderBottom: '1px solid rgba(0, 0, 0, 0.2)'}}
          >
            {item.label}
          </div>
        }
        value={value}
        onChange={e => onChange( e.target.value )}
        onSelect={value => onSelect(value)}
      />
    </div>
  );
};

export default PlacesAutoComplete;
